"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";

const MAX_HEARTS = 10;

export const upsertChallengeProgress = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized.");

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) throw new Error("User progress not found.");

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

  if (currentUserProgress.hearts === 0 && !isPractice)
    return { error: "hearts" };

  // Handle practice mode
  if (isPractice) {
    await db
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.id, existingChallengeProgress.id));

    await db
      .update(userProgress)
      .set({
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, userId));

    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    return { isPractice: true };
  }

  // Insert new challenge progress
  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
  });

  // Get all challenges for this lesson
  const lessonChallenges = await db.query.challenges.findMany({
    where: eq(challenges.lessonId, lessonId),
  });

  // Get all completed challenge progress for this user and lesson
  const lessonChallengeIds = lessonChallenges.map((ch) => ch.id);
  const completedChallengesForLesson = await db.query.challengeProgress.findMany({
    where: eq(challengeProgress.userId, userId),
  });

  // Filter to only this lesson's challenges
  const thisLessonProgress = completedChallengesForLesson.filter((cp) =>
    lessonChallengeIds.includes(cp.challengeId)
  );

  // Create a set of completed challenge IDs for this lesson
  const completedChallengeIds = new Set(
    thisLessonProgress.map((cp) => cp.challengeId)
  );

  // Check if all challenges in this lesson are now completed
  const allLessonChallengesCompleted = lessonChallenges.every((ch) =>
    completedChallengeIds.has(ch.id)
  );

  let heartsAwarded = 0;

  if (allLessonChallengesCompleted) {
    // Check if this is a perfect completion
    // Perfect = number of progress entries equals number of challenges
    // If user made mistakes, they'd have more progress entries (retries)
    const isPerfect = thisLessonProgress.length === lessonChallenges.length;

    // Award hearts: 2 for perfect, 1 for completed with mistakes
    heartsAwarded = isPerfect ? 2 : 1;

    // Update user progress with hearts and points
    await db
      .update(userProgress)
      .set({
        hearts: Math.min(currentUserProgress.hearts + heartsAwarded, MAX_HEARTS),
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, userId));
  } else {
    // Just award points for completing a challenge (not full lesson yet)
    await db
      .update(userProgress)
      .set({
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, userId));
  }

  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);

  return {
    heartsAwarded,
    lessonCompleted: allLessonChallengesCompleted,
  };
};