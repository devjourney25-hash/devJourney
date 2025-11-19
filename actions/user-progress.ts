"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { MAX_HEARTS, POINTS_TO_REFILL } from "@/constants";
import db from "@/db/drizzle";
import {
  getCourseById,
  getUserProgress,
} from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";

// Add return type definition
type UpsertUserProgressResult = 
  | { success: true }
  | { success: false; message: string };

export const upsertUserProgress = async (
  courseId: number
): Promise<UpsertUserProgressResult> => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) throw new Error("Unauthorized.");

  const course = await getCourseById(courseId);

  if (!course) throw new Error("Course not found.");

  // Instead of throwing error, return failure status
  if (!course.units.length || !course.units[0].lessons.length) {
    return { success: false, message: "Course is empty" };
  }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db
      .update(userProgress)
      .set({
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
      })
      .where(eq(userProgress.userId, userId));

    revalidatePath("/courses");
    revalidatePath("/learn");
    
    // Remove redirect, return success instead
    return { success: true };
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  
  // Remove redirect, return success instead
  return { success: true };
};

export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) throw new Error("Challenge not found.");

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) return { error: "practice" };

  if (!currentUserProgress) throw new Error("User progress not found.");

  if (currentUserProgress.hearts === 0) return { error: "hearts" };

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) throw new Error("User progress not found.");
  if (currentUserProgress.hearts === MAX_HEARTS)
    throw new Error("Hearts are already full.");
  if (currentUserProgress.points < POINTS_TO_REFILL)
    throw new Error("Not enough points.");

  await db
    .update(userProgress)
    .set({
      hearts: MAX_HEARTS,
      points: currentUserProgress.points - POINTS_TO_REFILL,
    })
    .where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};

export const buyOneHeart = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("User not found");
  }
  if (currentUserProgress.points < 20) {
    throw new Error("Not enough points");
  }
  if (currentUserProgress.hearts >= 10) {
    throw new Error("Hearts are already full");
  }

  await db.update(userProgress).set({
    hearts: Math.min(currentUserProgress.hearts + 1, 5),
    points: currentUserProgress.points - 50,
  }).where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quest");
  revalidatePath("/leaderboard");
};

export const buyTwoHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("User not found");
  }
  if (currentUserProgress.points < 50) {
    throw new Error("Not enough points");
  }
  if (currentUserProgress.hearts >= 4) {
    throw new Error("Not enough space for 2 hearts");
  }

  await db.update(userProgress).set({
    hearts: Math.min(currentUserProgress.hearts + 2, 10),
    points: currentUserProgress.points - 50,
  }).where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quest");
  revalidatePath("/leaderboard");
};

// ✨ NEW: Daily Heart Claim Function
export const claimDailyHeart = async () => {
  const { userId } = await auth();
  
  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("User progress not found.");
  }

  const now = new Date();
  const lastClaim = currentUserProgress.lastDailyHeartClaim 
    ? new Date(currentUserProgress.lastDailyHeartClaim) 
    : null;

  // Check if 24 hours have passed
  if (lastClaim) {
    const hoursSinceLastClaim = (now.getTime() - lastClaim.getTime()) / (1000 * 60 * 60);
    if (hoursSinceLastClaim < 24) {
      const hoursLeft = Math.ceil(24 - hoursSinceLastClaim);
      throw new Error(`Come back in ${hoursLeft} hours to claim your daily heart.`);
    }
  }

  // Can't exceed max hearts
  if (currentUserProgress.hearts >= MAX_HEARTS) {
    throw new Error("Hearts are already full.");
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.min(currentUserProgress.hearts + 1, MAX_HEARTS),
      lastDailyHeartClaim: now,
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/quests");
  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/leaderboard");

  return { success: true };
};