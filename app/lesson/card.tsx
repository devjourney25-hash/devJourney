import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useKey } from "react-use";

type Props = {
  id: number;
  imageSrc: string | null;
  text: string;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none";
  type: typeof challenges.$inferSelect["type"];
};

export const Card = ({
  id,
  imageSrc,
  text,
  shortcut,
  selected,
  onClick,
  disabled,
  status,
  type,
}: Props) => {
  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick();
  }, [disabled, onClick]);

  // Map numeric shortcuts to letters
  const mappedShortcut = String.fromCharCode(96 + parseInt(shortcut)); // Converts 1 -> 'a', 2 -> 'b', etc.

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 p-3 sm:p-4 lg:p-6 cursor-pointer active:border-b-2 transition-all duration-200 group",
        // Default state - dark theme
        "bg-slate-800/60 backdrop-blur-sm border-slate-700 hover:bg-slate-700/60 hover:border-slate-600",
        // Selected state (before answer check)
        selected && status === "none" && "border-blue-500 bg-blue-900/30 hover:bg-blue-900/40 shadow-lg shadow-blue-500/20",
        // Correct state
        selected && status === "correct" && "border-green-500 bg-green-900/30 hover:bg-green-900/40 shadow-lg shadow-green-500/20",
        // Wrong state
        selected && status === "wrong" && "border-red-500 bg-red-900/30 hover:bg-red-900/40 shadow-lg shadow-red-500/20",
        // Disabled state
        disabled && "pointer-events-none opacity-50 hover:bg-slate-800/60"
      )}
    >
      {imageSrc && (
        <div className="relative aspect-square mb-3 sm:mb-4 max-h-[60px] sm:max-h-[80px] lg:max-h-[150px] w-full rounded-lg overflow-hidden bg-slate-700/30 border border-slate-600">
          <Image 
            src={imageSrc} 
            fill 
            alt={text}
            className="object-cover"
          />
        </div>
      )}

      <div className="flex items-center justify-start gap-2 sm:gap-3 lg:gap-4">
        {/* Shortcut Badge */}
        <div
          className={cn(
            "w-6 h-6 sm:w-7 sm:h-7 lg:w-[30px] lg:h-[30px] border-2 flex items-center justify-center rounded-lg text-[10px] sm:text-xs lg:text-[15px] font-semibold transition-all flex-shrink-0",
            // Default state
            "border-slate-600 text-slate-400 bg-slate-700/50",
            // Selected state (before answer check)
            selected && status === "none" && "border-blue-500 text-blue-400 bg-blue-500/20",
            // Correct state
            selected && status === "correct" && "border-green-500 text-green-400 bg-green-500/20",
            // Wrong state
            selected && status === "wrong" && "border-red-500 text-red-400 bg-red-500/20",
            // Hover effect
            "group-hover:border-slate-500"
          )}
        >
          {mappedShortcut.toUpperCase()}
        </div>

        {/* Answer Text */}
        <p
          className={cn(
            "text-xs sm:text-sm lg:text-base font-medium transition-colors leading-tight",
            // Default state
            "text-gray-300",
            // Selected state (before answer check)
            selected && status === "none" && "text-blue-300",
            // Correct state
            selected && status === "correct" && "text-green-300",
            // Wrong state
            selected && status === "wrong" && "text-red-300"
          )}
        >
          {text}
        </p>
      </div>
    </div>
  );
};