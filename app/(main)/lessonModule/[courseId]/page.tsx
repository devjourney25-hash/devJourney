import { redirect } from "next/navigation";
import { getLessonModuleByCourseId, getUserProgress, getCourseById } from "@/db/queries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, BookOpen, Lightbulb, ArrowRight } from "lucide-react";
import { UnitDetailsSlider } from "./unit-details-slider";

type Props = {
  params: {
    courseId: string;
  };
};

const LessonModulePage = async ({ params }: Props) => {
  const userProgress = await getUserProgress();
  const courseId = parseInt(params.courseId);
  
  if (!userProgress) {
    redirect("/courses");
  }

  const lessonModule = await getLessonModuleByCourseId(courseId);
  const course = await getCourseById(courseId);

  if (!lessonModule || !course) {
    redirect("/courses");
  }

  const concepts = lessonModule.concepts ? JSON.parse(lessonModule.concepts) : [];
  const isActiveCourse = userProgress.activeCourseId === courseId;

  const unitDetails = lessonModule.unitDetails || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col items-center text-center gap-8">
            {/* Content */}
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white/90 font-medium">Programming Course</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                {lessonModule.title}
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed whitespace-pre-line">
                {lessonModule.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                {course.units.length > 0 && (
                  <Link href="/learn">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      {isActiveCourse ? "Continue Learning" : "Start Learning"}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                )}
                <Link href="/lessonModule">
                  <Button 
                    size="lg"
                    variant="primary"
                    className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg"
                  >
                    Back to Modules
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Key Concepts Section */}
        {concepts.length > 0 && (
          <section className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Key Concepts You'll Master</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {concepts.map((concept: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/30 transition-all hover:bg-white/10"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-white/90 text-lg">{concept}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Learning Tip Section */}
        {lessonModule.tip && (
          <section className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-md rounded-2xl p-8 border border-amber-500/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-3">Pro Tip</h2>
                <p className="text-white/90 text-lg leading-relaxed">{lessonModule.tip}</p>
              </div>
            </div>
          </section>
        )}

        {/* HORIZONTAL SLIDER - Unit Details */}
        {unitDetails.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Course Content</h2>
            <UnitDetailsSlider unitDetails={unitDetails} />
          </section>
        )}

        {/* CTA Section */}
        {course.units.length > 0 && (
          <section className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-12 border border-white/10 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of learners mastering {course.title} through interactive lessons and hands-on challenges.
            </p>
            <Link href={`/learn?courseId=${courseId}`}>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-12 py-6 text-xl shadow-lg hover:shadow-xl transition-all"
              >
                Start Learning
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </section>
        )}
      </div>
    </div>
  );
};

export default LessonModulePage;