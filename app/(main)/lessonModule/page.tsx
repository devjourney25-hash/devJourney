import { 
    getUserProgress, 
    getCourseById,
    getLessonModuleByCourseId,
} from "@/db/queries";
import { redirect } from "next/navigation";
import { LessonModuleContent } from "./LessonModuleContent";

const lessonModulePage = async () => {
    const userProgressData = getUserProgress();

    const userProgress = await userProgressData;

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    const courseId = userProgress.activeCourse.id;
    
    // Fetch course and lesson module data with unitDetails
    const [course, lessonModuleData] = await Promise.all([
        getCourseById(courseId),
        getLessonModuleByCourseId(courseId),
    ]);
    
    if (!course || !lessonModuleData) {
        redirect("/courses");
    }

    // Build the lessonModule object from the database
    const lessonModule = {
        title: lessonModuleData.title,
        description: lessonModuleData.description,
        tip: lessonModuleData.tip || undefined,
    };

    // Get concepts from lessonModule and ensure it's always an array
    let concepts: string[] = [];
    if (lessonModuleData.concepts) {
        if (Array.isArray(lessonModuleData.concepts)) {
            concepts = lessonModuleData.concepts;
        } else if (typeof lessonModuleData.concepts === 'string') {
            // If it's a JSON string, parse it
            try {
                const parsed = JSON.parse(lessonModuleData.concepts);
                concepts = Array.isArray(parsed) ? parsed : [];
            } catch {
                // If parsing fails, treat as empty array
                concepts = [];
            }
        }
    }

    // Get unitDetails from the lessonModule relation
    const unitDetails = lessonModuleData.unitDetails || [];

    // Check if this is the active course
    const isActiveCourse = userProgress.activeCourseId === courseId;
    
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <LessonModuleContent 
                courseId={courseId}
                lessonModule={lessonModule}
                course={{
                    title: course.title,
                    units: course.units,
                }}
                concepts={concepts}
                isActiveCourse={isActiveCourse}
                unitDetails={unitDetails}
            />
        </div>
    );
};

export default lessonModulePage;