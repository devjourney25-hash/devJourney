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

  // Fixed: Safe JSON parsing with fallback
  let keyPoints: string[] = [];
  if (currentSection.keyPoints) {
    try {
      const parsed = JSON.parse(currentSection.keyPoints);
      keyPoints = Array.isArray(parsed) ? parsed : [currentSection.keyPoints];
    } catch {
      // If parsing fails, treat as comma-separated or single item
      keyPoints = currentSection.keyPoints.includes(',') 
        ? currentSection.keyPoints.split(',').map((s: string) => s.trim())
        : [currentSection.keyPoints];
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-6 border-b border-white/10 gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
            {currentIndex + 1}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white/60 text-xs sm:text-sm">
              Section {currentIndex + 1} of {unitDetails.length}
            </p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white line-clamp-2 sm:truncate">{currentSection.title}</h3>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0 justify-center sm:justify-start">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === unitDetails.length - 1}
            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {unitDetails.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-green-500"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        <div className="bg-slate-900/30 rounded-lg p-6 border border-white/10">
          <p className="text-white/90 leading-relaxed whitespace-pre-line text-lg">
            {currentSection.content}
          </p>
        </div>

        {/* Sample Code */}
        {currentSection.sampleCode && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-400">
              <Code className="w-5 h-5" />
              <h5 className="font-bold text-lg">Code Example</h5>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-6 border border-white/10 overflow-x-auto">
              <pre className="text-green-400 text-sm font-mono leading-relaxed">
                <code>{currentSection.sampleCode}</code>
              </pre>
            </div>
            {currentSection.codeExplanation && (
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                <p className="text-white/80 leading-relaxed">
                  <strong className="text-blue-400">Explanation:</strong> {currentSection.codeExplanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Key Points */}
        {keyPoints.length > 0 && (
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-6 border border-amber-500/20">
            <div className="flex items-center gap-2 text-amber-400 mb-4">
              <Lightbulb className="w-5 h-5" />
              <h5 className="font-bold text-lg">Key Takeaways</h5>
            </div>
            <div className="space-y-2">
              {keyPoints.map((point: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-white/90">{point}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Hint */}
      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <p className="text-white/60 text-sm">
          Use arrows above or click the dots to navigate between sections
        </p>
      </div>
    </div>
  );
};