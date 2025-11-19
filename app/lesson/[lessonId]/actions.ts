"use server";

import db from "@/db/drizzle";
import { challenges, challengeOptions, challengeProgress } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function getRandomizedLessonChallenges(lessonId: number) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Fetch all challenges for this lesson
  const lessonChallenges = await db.query.challenges.findMany({
    where: eq(challenges.lessonId, lessonId),
    with: {
      challengeOptions: true,
    },
    orderBy: (challenges, { asc }) => [asc(challenges.order)],
  });

  // Fetch progress for each challenge
  const challengesWithProgress = await Promise.all(
    lessonChallenges.map(async (challenge) => {
      const progress = await db.query.challengeProgress.findFirst({
        where: and(
          eq(challengeProgress.challengeId, challenge.id),
          eq(challengeProgress.userId, userId)
        ),
      });

      return {
        ...challenge,
        completed: progress?.completed ?? false,
      };
    })
  );

  // Randomize the challenges
  const randomized = shuffleArray(challengesWithProgress);

  return randomized;
}