"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Code, CheckCircle, Lightbulb, BookOpen } from "lucide-react";

type Unit = {
  id: number;
  title: string;
  description: string;
  order: number;
  lessons: any[];
};

type Props = {
  units: Unit[];
};

export const UnitAccordion = ({ units }: Props) => {
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [unitDetailsCache, setUnitDetailsCache] = useState<{ [key: number]: any }>({});
  const [loading, setLoading] = useState(false);

  const currentUnit = units[currentUnitIndex];

  const loadUnitDetails = async (unitId: number) => {
    if (unitDetailsCache[unitId]) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/unitDetails?unitId=${unitId}`);
      const data = await response.json();
      setUnitDetailsCache(prev => ({ ...prev, [unitId]: data }));
    } catch (error) {
      console.error("Error fetching unit details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load first unit details on mount
  useEffect(() => {
    if (units.length > 0) {
      loadUnitDetails(units[0].id);
    }
  }, []);

  const unitDetails = unitDetailsCache[currentUnit?.id] || [];
  const currentSection = unitDetails[currentSectionIndex];

  const goToNextSection = () => {
    if (currentSectionIndex < unitDetails.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const changeUnit = (index: number) => {
    setCurrentUnitIndex(index);
    setCurrentSectionIndex(0);
    loadUnitDetails(units[index].id);
  };

  if (!currentUnit) return null;

  return (
    <div className="relative space-y-6 w-full overflow-hidden">
      {/* Unit Selector - Horizontal Scroll */}
      <div className="relative w-full">
        <div className="flex items-center gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20 px-1">
          {units.map((unit, index) => {
            const isSelected = currentUnitIndex === index;
            
            return (
              <button
                key={unit.id}
                onClick={() => changeUnit(index)}
                className={`flex-shrink-0 snap-start w-80 p-6 rounded-xl border-2 transition-all ${
                  isSelected
                    ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400 shadow-lg shadow-blue-500/20"
                    : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0 ${
                    isSelected ? "bg-gradient-to-br from-blue-500 to-purple-600" : "bg-white/20"
                  }`}>
                    {unit.order}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className={`text-lg font-bold mb-1 ${
                      isSelected ? "text-white" : "text-white/80"
                    }`}>
                      {unit.title}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2">{unit.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <BookOpen className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-white/80 text-sm font-semibold">
                    {unit.lessons.length} Lessons
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Content */}
      {loading ? (
        <div className="bg-white/5 rounded-xl border border-white/10 p-12 text-center">
          <div className="inline-block w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="text-white/70 mt-4">Loading unit details...</p>
        </div>
      ) : unitDetails.length > 0 && currentSection ? (
        <div className="bg-white/5 rounded-xl border border-white/10 p-6 w-full overflow-hidden">
          {/* Section Navigation Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                {currentSectionIndex + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white/60 text-sm">
                  Section {currentSectionIndex + 1} of {unitDetails.length}
                </p>
                <h3 className="text-2xl font-bold text-white truncate">{currentSection.title}</h3>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={goToPreviousSection}
                disabled={currentSectionIndex === 0}
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                aria-label="Previous section"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={goToNextSection}
                disabled={currentSectionIndex === unitDetails.length - 1}
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                aria-label="Next section"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Progress Dots for Sections */}
          <div className="flex justify-center gap-2 mb-6 overflow-x-auto pb-2">
            {unitDetails.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentSectionIndex(index)}
                className={`h-2 rounded-full transition-all flex-shrink-0 ${
                  index === currentSectionIndex
                    ? "w-8 bg-green-500"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to section ${index + 1}`}
              />
            ))}
          </div>

          {/* Section Content */}
          <div className="space-y-6 w-full overflow-hidden">
            {/* Content */}
            <div className="bg-slate-900/30 rounded-lg p-6 border border-white/10">
              <p className="text-white/90 leading-relaxed whitespace-pre-line text-lg break-words">
                {currentSection.content}
              </p>
            </div>

            {/* Sample Code */}
            {currentSection.sampleCode && (
              <div className="space-y-4 w-full overflow-hidden">
                <div className="flex items-center gap-2 text-green-400">
                  <Code className="w-5 h-5 flex-shrink-0" />
                  <h5 className="font-bold text-lg">Code Example</h5>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-6 border border-white/10 overflow-x-auto">
                  <pre className="text-green-400 text-sm font-mono leading-relaxed">
                    <code>{currentSection.sampleCode}</code>
                  </pre>
                </div>
                {currentSection.codeExplanation && (
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                    <p className="text-white/80 leading-relaxed break-words">
                      <strong className="text-blue-400">Explanation:</strong> {currentSection.codeExplanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Key Points */}
            {(() => {
              const keyPoints = currentSection.keyPoints ? JSON.parse(currentSection.keyPoints) : [];
              return keyPoints.length > 0 ? (
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-6 border border-amber-500/20">
                  <div className="flex items-center gap-2 text-amber-400 mb-4">
                    <Lightbulb className="w-5 h-5 flex-shrink-0" />
                    <h5 className="font-bold text-lg">Key Takeaways</h5>
                  </div>
                  <div className="space-y-2">
                    {keyPoints.map((point: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                        <p className="text-white/90 break-words">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      ) : (
        <div className="bg-white/5 rounded-xl border border-white/10 p-12 text-center text-white/70">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No detailed content available for this unit yet.</p>
        </div>
      )}

      {/* Lessons List */}
      {currentUnit.lessons.length > 0 && (
        <div className="bg-white/5 rounded-xl border border-white/10 p-6 w-full overflow-hidden">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 flex-shrink-0" />
            Lessons in This Unit ({currentUnit.lessons.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentUnit.lessons.map((lesson: any) => (
              <div
                key={lesson.id}
                className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-colors min-w-0"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {lesson.order}
                </div>
                <p className="text-white/90 text-sm truncate">{lesson.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};