import { BookOpen } from "lucide-react";

type Props = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: Props) => {
  return (
    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 md:mb-10 border border-slate-700 overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
      
      {/* Content */}
      <div className="relative flex items-center gap-3 sm:gap-4 md:gap-6">
        {/* Icon */}
        <div className="bg-blue-500/20 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-blue-500/30 flex-shrink-0">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-400" />
        </div>
        
        {/* Text Content */}
        <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
          <h3 className="text-base sm:text-lg md:text-2xl font-bold text-white leading-tight">{title}</h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-snug">{description}</p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-purple-500/5 rounded-full blur-3xl"></div>
    </div>
  );
};