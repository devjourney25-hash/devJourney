import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
  lessonId?: number;
};

export const Footer = ({
  onCheck,
  status,
  disabled,
  lessonId,
}: Props) => {
  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width: 1024px)");

  return (
    <footer
      className={cn(
        "h-[100px] lg:h-[100px] fixed bottom-0 left-0 right-0 w-full transition-all duration-300 backdrop-blur-lg border-t",
        // Default state
        status === "none" && "bg-slate-900/95 border-slate-700",
        // Correct state
        status === "correct" && "bg-gradient-to-r from-green-900/95 to-emerald-900/95 border-green-500/30 shadow-lg shadow-green-500/20",
        // Wrong state
        status === "wrong" && "bg-gradient-to-r from-red-900/95 to-rose-900/95 border-red-500/30 shadow-lg shadow-red-500/20",
        // Completed state
        status === "completed" && "bg-gradient-to-r from-blue-900/95 to-purple-900/95 border-blue-500/30 shadow-lg shadow-blue-500/20"
      )}
    >
      {/* Top gradient line */}
      <div className={cn(
        "h-1 w-full",
        status === "correct" && "bg-gradient-to-r from-transparent via-green-400 to-transparent",
        status === "wrong" && "bg-gradient-to-r from-transparent via-red-400 to-transparent",
        status === "completed" && "bg-gradient-to-r from-transparent via-blue-400 to-transparent",
        status === "none" && "bg-gradient-to-r from-transparent via-slate-600 to-transparent"
      )} />

      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {/* Status Messages */}
        {status === "correct" && (
          <div className="text-green-300 font-bold text-sm sm:text-base lg:text-xl flex items-center gap-2 sm:gap-3 animate-in fade-in slide-in-from-left duration-300">
            <div className="bg-green-500/20 p-1.5 sm:p-2 rounded-full border border-green-500/30">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-green-400" />
            </div>
            <span className="drop-shadow-lg">Nicely Done!</span>
          </div>
        )}
        
        {status === "wrong" && (
          <div className="text-red-300 font-bold text-sm sm:text-base lg:text-xl flex items-center gap-2 sm:gap-3 animate-in fade-in slide-in-from-left duration-300">
            <div className="bg-red-500/20 p-1.5 sm:p-2 rounded-full border border-red-500/30">
              <XCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-red-400" />
            </div>
            <span className="drop-shadow-lg">Try Again</span>
          </div>
        )}
        
        {status === "completed" && (
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-blue-300 font-bold text-sm sm:text-base lg:text-xl flex items-center gap-2 sm:gap-3 animate-in fade-in slide-in-from-left duration-300">
              <div className="bg-blue-500/20 p-1.5 sm:p-2 rounded-full border border-blue-500/30">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-blue-400" />
              </div>
              <span className="drop-shadow-lg hidden sm:inline">Lesson Complete!</span>
              <span className="drop-shadow-lg sm:hidden">Complete!</span>
            </div>
            <Button
              variant="dark"
              size={isMobile ? "sm" : "default"}
              onClick={() => window.location.href = `/lesson/${lessonId}`}
              className="bg-slate-700 hover:bg-slate-600 border-slate-600"
            >
              Practice Again
            </Button>
          </div>
        )}

        {/* Action Button */}
        <Button
          disabled={disabled}
          className={cn(
            "ml-auto font-bold shadow-lg transition-all",
            status === "correct" && "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 border-green-700 shadow-green-500/30",
            status === "wrong" && "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 border-red-700 shadow-red-500/30",
            status === "none" && "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-blue-700 shadow-blue-500/30",
            status === "completed" && "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-blue-700 shadow-blue-500/30"
          )}
          onClick={onCheck}
          size={isMobile ? "sm" : "default"}
          variant={status === "wrong" ? "danger" : "primary"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>
      </div>
    </footer>
  );
};