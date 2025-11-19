import { redirect } from "next/navigation";
import {getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { Unit } from "./unit";
import { lessons, units as unitsSchema } from "@/db/schema";
import {Leaderboard} from "@/components/leaderboard";
import {Quest} from "@components/quest";
import { DailyTip } from "@/components/DailyTip";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();

  const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
  ]);

  console.log("User Progress:", userProgress);

  if (!userProgress || !userProgress.activeCourse) {
    console.log("Redirecting to /courses because userProgress or activeCourse is undefined");
    redirect("/courses");
  }

  // Add null check for imageSrc
  if (!userProgress.activeCourse.imageSrc) {
    console.log("Redirecting to /courses because imageSrc is null");
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/learn");
  }

  console.log("Active Course Title:", userProgress.activeCourse.title);

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{
            ...userProgress.activeCourse,
            imageSrc: userProgress.activeCourse.imageSrc // Now guaranteed non-null
          }}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
        <DailyTip />
        <Leaderboard />
        <Quest points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.length > 0 ? (
          units.map((unit) => (
            <div key={unit.id} className="mb-10 bg-glass-dark bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-lg">
              <Unit
                id={unit.id}
                order={unit.order}
                description={unit.description}
                title={unit.title}
                lessons={unit.lessons}
                activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & { 
                  unit: typeof unitsSchema.$inferSelect; 
                } | undefined}
                activeLessonPercentage={lessonPercentage}
              />
            </div>
          ))
        ) : (
          <div className="bg-glass-dark bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-lg">No units available</div>
        )}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;