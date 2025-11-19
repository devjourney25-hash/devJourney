"use client";

import Link from "next/link";
import { PartyPopper, Lock, Check, Play } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage?: number;
};

export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage = 0, 
}: Props) => {
  const spacing = 60;
  const indentationLevel = index % 2 === 0 ? 0 : 1; 
  const rightPosition = indentationLevel * spacing;
  
  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? PartyPopper : locked ? Lock : Play;
  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  return (
    <div>
      <Link
        href={href}
        aria-disabled={locked}
        style={{ pointerEvents: locked ? "none" : "auto" }}
      >
        <div
          className="relative group"
          style={{
            right: `${rightPosition}px`,
            marginTop: isFirst && !isCompleted ? 60 : 24,
          }}
        >
          {current ? (
            <div className="h-[102px] w-[102px] relative">
              {/* Start Badge */}
              <div 
                className="absolute -top-6 -left-2.5 px-3 py-2.5 border-2 border-blue-500 font-bold uppercase text-blue-400 bg-slate-800 rounded-lg shadow-lg shadow-blue-500/20 animate-bounce tracking-wide z-10"
              >
                Start
                <div
                  className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-blue-500 transform -translate-x-1/2"
                />
              </div>
              
              {/* Progress Circle */}
              <CircularProgressbarWithChildren
                value={Number.isNaN(percentage) ? 0 : percentage}
                styles={{
                  path: { 
                    stroke: "#3B82F6", 
                    strokeLinecap: "round",
                    filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.5))"
                  },
                  trail: { 
                    stroke: "#1E293B",
                    strokeWidth: 6
                  },
                }}
              >
                <Button
                  size="rounded"
                  variant={locked ? "locked" : "abyss"}
                  className={cn(
                    "h-[70px] w-[70px] border-b-8 transition-all duration-300",
                    locked 
                      ? "bg-slate-800 border-slate-700 hover:bg-slate-800" 
                      : "bg-gradient-to-br from-blue-600 to-purple-600 border-blue-700 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-10 w-10 transition-transform group-hover:scale-110",
                      locked
                        ? "text-slate-600"
                        : "text-white",
                      isCompleted && "fill-none stroke-[4]"
                    )}
                  />
                </Button>
              </CircularProgressbarWithChildren>
            </div>
          ) : (
            <Button
              size="rounded"
              variant={locked ? "locked" : "abyss"}
              className={cn(
                "h-[70px] w-[70px] border-b-8 transition-all duration-300",
                locked 
                  ? "bg-slate-800 border-slate-700 hover:bg-slate-800 opacity-60" 
                  : isCompleted 
                  ? "bg-gradient-to-br from-green-600 to-emerald-600 border-green-700 hover:from-green-500 hover:to-emerald-500 shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
                  : "bg-slate-700 border-slate-600 hover:bg-slate-600 shadow-lg"
              )}
            >
              <Icon
                className={cn(
                  "h-10 w-10 transition-transform group-hover:scale-110",
                  locked
                    ? "text-slate-600"
                    : isCompleted 
                    ? "text-white fill-none stroke-[4]"
                    : "text-slate-400",
                )}
              />
            </Button>
          )}
        </div>
      </Link>
    </div>
  );
};