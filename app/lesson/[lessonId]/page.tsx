import { redirect } from "next/navigation";
import { getRandomizedLessonChallenges } from "./actions";
import { getUserProgress } from "@/db/queries";
import { Quiz } from "../quiz"; // Import from parent lesson folder

type Props = {
  params: {
    lessonId: string;
  };
};

const LessonPage = async ({ params }: Props) => {
  const lessonId = parseInt(params.lessonId);
  
  const userProgressData = getUserProgress();
  const lessonData = getRandomizedLessonChallenges(lessonId);

  const [userProgress, lesson] = await Promise.all([
    userProgressData,
    lessonData,
  ]);

  if (!userProgress || !lesson) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.filter((challenge) => challenge.completed).length /
      lesson.length) *
    100;

  return (
    <Quiz
      initialLessonId={lessonId}
      initialLessonChallenges={lesson}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
    />
  );
};

export default LessonPage;