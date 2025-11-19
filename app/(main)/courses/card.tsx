import { Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  title: string;
  id: number;
  imageSrc: string | null;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
  isEmpty?: boolean;
};

export const Card = ({
  title,
  id,
  imageSrc,
  onClick,
  disabled,
  active,
  isEmpty,
}: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "h-full relative backdrop-blur-md bg-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-between",
        // Responsive padding
        "p-3 xs:p-4 sm:p-5 md:p-6",
        // Responsive min height
        "min-h-[180px] xs:min-h-[200px] sm:min-h-[220px] md:min-h-[230px]",
        // Responsive min width
        "min-w-[140px] xs:min-w-[160px] sm:min-w-[180px] md:min-w-[200px]",
        "overflow-hidden",
        disabled && "pointer-events-none opacity-50",
        isEmpty && "opacity-70"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl z-0"></div>
      
      <div className="absolute -inset-1 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
      
      {/* Status badges with responsive sizing */}
      <div className="min-h-[20px] sm:min-h-[24px] w-full flex items-center justify-end relative z-10">
        {active && (
          <div className="rounded-md bg-green-500 flex items-center justify-center p-1 sm:p-1.5 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
            <Check className="text-white stroke-[4] h-3 w-3 sm:h-4 sm:w-4" />
          </div>
        )}
        {isEmpty && !active && (
          <div className="rounded-md bg-amber-500/80 flex items-center justify-center p-1 sm:p-1.5 shadow-[0_0_10px_rgba(245,158,11,0.5)]">
            <AlertCircle className="text-white stroke-[3] h-3 w-3 sm:h-4 sm:w-4" />
          </div>
        )}
      </div>
      
      {/* Responsive image container */}
      <div className="relative group p-1 z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-25 blur-md rounded-lg group-hover:opacity-40 transition-opacity duration-300"></div>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            width={100}
            height={75}
            className={cn(
              "rounded-lg object-cover border border-white/20 relative z-10 shadow-md group-hover:scale-105 transition-transform duration-300",
              // Responsive image sizing
              "w-[60px] h-[45px]",
              "xs:w-[70px] xs:h-[52px]",
              "sm:w-[85px] sm:h-[64px]",
              "md:w-[100px] md:h-[75px]"
            )}
          />
        ) : (
          <div className={cn(
            "rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 border border-white/20 relative z-10 shadow-md flex items-center justify-center",
            // Responsive fallback image sizing
            "w-[60px] h-[45px]",
            "xs:w-[70px] xs:h-[52px]",
            "sm:w-[85px] sm:h-[64px]",
            "md:w-[100px] md:h-[75px]"
          )}>
            <span className="text-white/50 text-[9px] xs:text-[10px] sm:text-xs font-semibold">
              No Image
            </span>
          </div>
        )}
      </div>
      
      {/* Responsive text container */}
      <div className="flex flex-col items-center gap-0.5 sm:gap-1">
        <p className={cn(
          "text-white font-bold text-center relative z-10 text-shadow-glow group-hover:text-glow transition-all duration-300",
          // Responsive font size and spacing
          "text-xs mt-2",
          "xs:text-sm xs:mt-3",
          "sm:text-base sm:mt-3",
          "md:text-base md:mt-4",
          // Handle long text
          "line-clamp-2 break-words px-1"
        )}>
          {title}
        </p>
        {isEmpty && (
          <p className={cn(
            "text-amber-400 font-semibold text-center relative z-10 animate-pulse",
            // Responsive font size for "Coming Soon"
            "text-[10px]",
            "xs:text-[11px]",
            "sm:text-xs"
          )}>
            Coming Soon
          </p>
        )}
      </div>
    </div>
  );
};