"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Card } from "./card";
import { upsertUserProgress } from "@/actions/user-progress";
import { courses, userProgress } from "@/db/schema";

type Props = {
  courses: (typeof courses.$inferSelect & {
    units: Array<{
      lessons: any[];
    }>;
  })[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      return router.push("/lessonModule");
    }

    startTransition(async () => {
      try {
        const result = await upsertUserProgress(id);

        if (!result.success) {
          toast.error("Course Not Available", {
            description: "This course doesn't have any content yet. We're working on it! 🚀",
            duration: 3000,
          });
          return;
        }

        router.push("/lessonModule");
      } catch (error) {
        toast.error("Something went wrong", {
          description: "Failed to update your progress. Please try again.",
        });
      }
    });
  };

  const isCourseEmpty = (course: (typeof courses)[0]) => {
    return !course.units?.length || !course.units[0]?.lessons?.length;
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc} // Now accepts null
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
          isEmpty={isCourseEmpty(course)}
        />
      ))}
    </div>
  );
};