"use server";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { questProgress, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const claimQuestHearts = async (questId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  // Calculate hearts reward based on quest position
  const quests = await import("@/constants").then((mod) => mod.quests);
  const questIndex = quests.findIndex((q) => q.value === questId);
  const heartsReward = questIndex + 1;

  // Check if quest is already claimed
  const existingClaim = await db.query.questProgress.findFirst({
    where: and(
      eq(questProgress.userId, userId),
      eq(questProgress.questId, questId)
    ),
  });

  if (existingClaim) {
    return { error: "Already claimed" };
  }

  // Check if quest is completed
  if (currentUserProgress.points < questId) {
    throw new Error("Quest not completed");
  }

  // Add the claim record
  await db.insert(questProgress).values({
    userId,
    questId,
    claimed: true,
  });

  // Update user hearts
  await db
    .update(userProgress)
    .set({
      hearts: Math.min(currentUserProgress.hearts + heartsReward, 10), // Max 10 hearts
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/quests");
  revalidatePath("/learn");
  revalidatePath("/leaderboard");
};