"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Code, CheckCircle, Lightbulb } from "lucide-react";

type Props = {
  unitDetails: any[];
};

export const UnitDetailsSlider = ({ unitDetails }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSection = unitDetails[currentIndex];

  const goToNext = () => {
    if (currentIndex < unitDetails.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!currentSection) return null;

  let keyPoints: string[] = [];
  if (currentSection.keyPoints) {
    try {
      const parsed = JSON.parse(currentSection.keyPoints);
      keyPoints = Array.isArray(parsed) ? parsed : [currentSection.keyPoints];
    } catch {
      keyPoints = currentSection.keyPoints.includes(',') 
        ? currentSection.keyPoints.split(',').map((s: string) => s.trim())
        : [currentSection.keyPoints];
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-white/10 gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-lg flex-shrink-0">
            {currentIndex + 1}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white/60 text-xs sm:text-sm">
              Section {currentIndex + 1} of {unitDetails.length}
            </p>
            <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-white line-clamp-2 sm:truncate">{currentSection.title}</h3>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0 justify-center sm:justify-start">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === unitDetails.length - 1}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2">
        {unitDetails.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-6 sm:w-8 bg-green-500"
                : "w-1.5 sm:w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-slate-900/30 rounded-lg p-4 sm:p-5 lg:p-6 border border-white/10">
          <p className="text-white/90 leading-relaxed whitespace-pre-line text-sm sm:text-base lg:text-lg">
            {currentSection.content}
          </p>
        </div>

        {/* Sample Code */}
        {currentSection.sampleCode && (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-green-400">
              <Code className="w-4 h-4 sm:w-5 sm:h-5" />
              <h5 className="font-bold text-base sm:text-lg">Code Example</h5>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 sm:p-5 lg:p-6 border border-white/10 overflow-x-auto">
              <pre className="text-green-400 text-xs sm:text-sm font-mono leading-relaxed">
                <code>{currentSection.sampleCode}</code>
              </pre>
            </div>
            {currentSection.codeExplanation && (
              <div className="bg-blue-500/10 rounded-lg p-3 sm:p-4 border border-blue-500/20">
                <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                  <strong className="text-blue-400">Explanation:</strong> {currentSection.codeExplanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Key Points */}
        {keyPoints.length > 0 && (
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-4 sm:p-5 lg:p-6 border border-amber-500/20">
            <div className="flex items-center gap-2 text-amber-400 mb-3 sm:mb-4">
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
              <h5 className="font-bold text-base sm:text-lg">Key Takeaways</h5>
            </div>
            <div className="space-y-2">
              {keyPoints.map((point: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0 mt-0.5 sm:mt-1" />
                  <p className="text-white/90 text-sm sm:text-base">{point}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Hint */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 text-center">
        <p className="text-white/60 text-xs sm:text-sm">
          Use arrows above or click the dots to navigate between sections
        </p>
      </div>
    </div>
  );
};