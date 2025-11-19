import Link from "next/link";
import { Button } from "@/components/ui/button"; 
import { Check, BookOpen, Lightbulb, ArrowRight } from "lucide-react";
import { UnitDetailsSlider } from "./[courseId]/unit-details-slider";

interface LessonModuleContentProps {
  courseId: number;
  lessonModule: {
    title: string;
    description: string;
    tip?: string;
  };
  course: {
    title: string;
    units: any[];
  };
  concepts: string[];
  isActiveCourse: boolean;
  unitDetails: any[];
}

export const LessonModuleContent = ({
  courseId,
  lessonModule,
  course,
  concepts,
  isActiveCourse,
  unitDetails,
}: LessonModuleContentProps) => {

  return (
    <div className="w-full"> 
      {/* Hero Section - Mobile Responsive */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
        <div className="w-full px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-12">
            {/* Content */}
            <div className="flex-1 space-y-4 sm:space-y-6 w-full max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20">
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                <span className="text-xs sm:text-sm text-white/90 font-medium">Programming Course</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                {lessonModule.title}
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed whitespace-pre-line">
                {lessonModule.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
        {/* Key Concepts Section - Mobile Responsive */}
        {concepts.length > 0 && (
          <section className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Key Concepts You'll Master</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {concepts.map((concept: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-2 sm:gap-3 bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10 hover:border-white/30 transition-all hover:bg-white/10"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  </div>
                  <p className="text-white/90 text-sm sm:text-base lg:text-lg">{concept}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Learning Tip Section - Mobile Responsive */}
        {lessonModule.tip && (
          <section className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-amber-500/20">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">Pro Tip</h2>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed">{lessonModule.tip}</p>
              </div>
            </div>
          </section>
        )}

        {/* Unit Details Slider - Mobile Responsive */}
        {unitDetails.length > 0 && (
          <section className="space-y-4 sm:space-y-6 lg:space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Course Content</h2>
            <UnitDetailsSlider unitDetails={unitDetails} />
          </section>
        )}

        {/* CTA Section - Mobile Responsive */}
        {course.units.length > 0 && (
          <section className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 border border-white/10 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Ready to Start Your Journey?</h2>
            <p className="text-sm sm:text-base lg:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of learners mastering {course.title} through interactive lessons and hands-on challenges.
            </p>
            <Link href={`/learn?courseId=${courseId}`} className="block w-full sm:w-auto">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-4 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 text-base sm:text-lg lg:text-xl shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  Start Learning
                  <ArrowRight className="hidden sm:inline-block w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0" />
                </span>
              </Button>
            </Link>
          </section>
        )}
      </div>
    </div>
  );
};