import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import db from "./drizzle";
import {
  challengeProgress,
  courses,
  lessons,
  units,
  userProgress,
  lessonModules,
  dailyTips,
  unitDetails,
} from "./schema";

const DAY_IN_MS = 86_400_000;

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany({
    with: {
      units: {
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)],
          },
        },
      },
    },
  });

  return data;
});

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) return [];

  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    orderBy: (units, { asc }) => [asc(units.order)],
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      if (lesson.challenges.length === 0)
        return { ...lesson, completed: false };

      const allCompletedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        );
      });

      return { ...lesson, completed: allCompletedChallenges };
    });

    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedData;
});

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    with: {
      units: {
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)],
          },
        },
      },
    },
  });

  return data;
});

export const getCourseProgress = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) return null;

  const unitsInActiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some((progress) => !progress.completed)
        );
      });
    });

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});

export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();

  if (!userId) return null;

  const courseProgress = await getCourseProgress();
  const lessonId = id || courseProgress?.activeLessonId;

  if (!lessonId) return null;

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });

  if (!data || !data.challenges) return null;

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed);

    return { ...challenge, completed };
  });

  return { ...data, challenges: normalizedChallenges };
});

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();

  if (!courseProgress?.activeLessonId) return 0;

  const lesson = await getLesson(courseProgress?.activeLessonId);

  if (!lesson) return 0;

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  );

  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  );

  return percentage;
});

export const getTopTenUsers = cache(async () => {
  const { userId } = await auth();

  if (!userId) return [];

  const data = await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    limit: 10,
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    },
  });

  return data;
});

// ============================================
// DAILY TIPS QUERIES
// ============================================
export const getDailyTips = cache(async () => {
  const data = await db.query.dailyTips.findMany({
    orderBy: (dailyTips, { desc }) => [desc(dailyTips.createdAt)],
  });
  return data;
});

export const getActiveDailyTips = cache(async () => {
  const data = await db.query.dailyTips.findMany({
    where: eq(dailyTips.isActive, true),
    orderBy: (dailyTips, { desc }) => [desc(dailyTips.createdAt)],
  });
  return data;
});

export const getDailyTip = cache(async (date?: Date) => {
  const tips = await getActiveDailyTips();
  
  if (tips.length === 0) {
    return null;
  }

  const targetDate = date || new Date();
  const dayOfYear = Math.floor(
    (targetDate.getTime() - new Date(targetDate.getFullYear(), 0, 0).getTime()) / 
    (1000 * 60 * 60 * 24)
  );
  
  // Seeded random function for consistent daily tips
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  
  const randomIndex = Math.floor(seededRandom(dayOfYear) * tips.length);
  return tips[randomIndex];
});

export const getDailyTipById = cache(async (id: number) => {
  const data = await db.query.dailyTips.findFirst({
    where: eq(dailyTips.id, id),
  });
  return data;
});

// ============================================
// LESSON MODULES QUERIES (Learning Content)
// ============================================

// Get lesson module by course ID with all unit details
export const getLessonModuleByCourseId = cache(async (courseId: number) => {
  const data = await db.query.lessonModules.findFirst({
    where: eq(lessonModules.courseId, courseId),
    with: {
      course: true,
      unitDetails: {
        orderBy: (unitDetails, { asc }) => [asc(unitDetails.order)],
      },
    },
  });

  return data;
});

// Get all lesson modules with their unit details
export const getAllLessonModules = cache(async () => {
  const data = await db.query.lessonModules.findMany({
    orderBy: (lessonModules, { asc }) => [asc(lessonModules.order)],
    with: {
      course: true,
      unitDetails: {
        orderBy: (unitDetails, { asc }) => [asc(unitDetails.order)],
      },
    },
  });

  return data;
});

// Get a specific lesson module by ID
export const getLessonModuleById = cache(async (id: number) => {
  const data = await db.query.lessonModules.findFirst({
    where: eq(lessonModules.id, id),
    with: {
      course: true,
      unitDetails: {
        orderBy: (unitDetails, { asc }) => [asc(unitDetails.order)],
      },
    },
  });

  return data;
});

// ============================================
// UNIT DETAILS QUERIES (Learning Content Details)
// ============================================

// Get all unit details for a specific lesson module
export const getUnitDetailsByLessonModuleId = cache(async (lessonModuleId: number) => {
  const data = await db.query.unitDetails.findMany({
    where: eq(unitDetails.lessonModuleId, lessonModuleId),
    orderBy: (unitDetails, { asc }) => [asc(unitDetails.order)],
    with: {
      lessonModule: {
        with: {
          course: true,
        },
      },
    },
  });

  return data;
});

// Get a specific unit detail by ID
export const getUnitDetailById = cache(async (id: number) => {
  const data = await db.query.unitDetails.findFirst({
    where: eq(unitDetails.id, id),
    with: {
      lessonModule: {
        with: {
          course: true,
        },
      },
    },
  });

  return data;
});

// Get all unit details across all lesson modules
export const getAllUnitDetails = cache(async () => {
  const data = await db.query.unitDetails.findMany({
    orderBy: (unitDetails, { asc }) => [asc(unitDetails.order)],
    with: {
      lessonModule: {
        with: {
          course: true,
        },
      },
    },
  });

  return data;
});

// ============================================
// UNITS QUERIES (Quiz/Challenge Units)
// ============================================

// Get a unit with its lessons and challenges (for quiz system)
export const getUnitById = cache(async (unitId: number) => {
  const data = await db.query.units.findFirst({
    where: eq(units.id, unitId),
    with: {
      course: true,
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            orderBy: (challenges, { asc }) => [asc(challenges.order)],
          },
        },
      },
    },
  });

  return data;
});