import Image from "next/image";
import { cn } from "@/lib/utils";
import { Award, Heart } from "lucide-react";

type Props = {
  value: number;
  variant: "points" | "hearts";
};

export const ResultCard = ({ value, variant }: Props) => {
  return (
    <div
      className={cn(
        "rounded-xl sm:rounded-2xl border-2 w-full shadow-lg sm:shadow-xl transition-all duration-300 hover:scale-105",
        variant === "points" && "bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30 shadow-blue-500/20",
        variant === "hearts" && "bg-gradient-to-br from-red-900/40 to-rose-900/40 border-red-500/30 shadow-red-500/20"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "p-2 sm:p-3 rounded-t-lg sm:rounded-t-xl font-bold text-center uppercase text-[10px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 border-b-2",
          variant === "hearts" && "bg-red-600/30 text-red-300 border-red-500/30",
          variant === "points" && "bg-blue-600/30 text-blue-300 border-blue-500/30"
        )}
      >
        {variant === "hearts" ? (
          <>
            <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
            Hearts Left
          </>
        ) : (
          <>
            <Award className="w-3 h-3 sm:w-4 sm:h-4" />
            Total XP
          </>
        )}
      </div>

      {/* Value Display */}
      <div
        className={cn(
          "rounded-b-lg sm:rounded-b-xl flex items-center justify-center p-4 sm:p-6 lg:p-8 font-bold text-2xl sm:text-3xl lg:text-4xl backdrop-blur-sm",
          variant === "hearts" && "text-red-400 bg-red-950/30",
          variant === "points" && "text-blue-400 bg-blue-950/30"
        )}
      >
        <span className="drop-shadow-lg">{value}</span>
      </div>
    </div>
  );
};