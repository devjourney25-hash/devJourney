import { X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useExitModal } from "@/store/use-exit-modal";

type Props = {
  hearts: number;
  percentage: number;
};

export const Header = ({
  hearts,
  percentage,
}: Props) => {
  const { open } = useExitModal();

  return (
    <header className="lg:pt-[50px] pt-[20px] px-6 lg:px-20 flex gap-x-4 lg:gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      {/* Exit Button */}
      <button
        onClick={open}
        className="group bg-slate-800/60 hover:bg-slate-700/60 border-2 border-slate-700 hover:border-slate-600 rounded-xl p-2 transition-all duration-200 shadow-lg"
        aria-label="Exit quiz"
      >
        <X className="text-gray-400 group-hover:text-gray-300 transition-colors w-6 h-6" />
      </button>

      {/* Progress Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Progress 
            value={percentage} 
            className="h-4 bg-slate-800 border-2 border-slate-700 rounded-full overflow-hidden shadow-inner"
          />
          {/* Percentage Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow-lg">
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
      </div>

      {/* Hearts Display */}
      <div className="flex items-center gap-2 bg-gradient-to-br from-red-900/40 to-rose-900/40 border-2 border-red-500/30 rounded-xl px-4 py-2 shadow-lg shadow-red-500/10">
        <div className="relative">
          <Image 
            src="/heart.png" 
            height={24} 
            width={24} 
            alt="Heart" 
            className="drop-shadow-lg"
          />
          {hearts === 0 && (
            <div className="absolute inset-0 bg-black/50 rounded-full" />
          )}
        </div>
        <span className={`font-bold text-lg ${hearts === 0 ? 'text-gray-400' : 'text-red-400'}`}>
          {hearts}
        </span>
      </div>
    </header>
  );
};