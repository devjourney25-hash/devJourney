import Image from "next/image";

type Props = {
  question: string;
};

export const QuestionBubble = ({ question }: Props) => {
  return (
    <div className="flex items-center gap-x-4 mb-6 animate-in fade-in slide-in-from-left duration-500">
      {/* Mascot Avatar - Large */}
      <div className="hidden lg:block relative">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="relative bg-slate-800 border-2 border-slate-700 rounded-full p-1 shadow-lg">
          <Image
            src="/LOGO.png"
            alt="Mascot"
            height={60}
            width={60}
            className="rounded-full"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </div>

      {/* Mascot Avatar - Small */}
      <div className="block lg:hidden relative">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg"></div>
        <div className="relative bg-slate-800 border-2 border-slate-700 rounded-full p-1 shadow-lg">
          <Image
            src="/LOGO.png"
            alt="Mascot"
            height={40}
            width={40}
            className="rounded-full"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </div>

      {/* Question Bubble */}
      <div className="relative">
        <div className="relative py-4 px-6 bg-slate-800/80 backdrop-blur-sm border-2 border-slate-700 rounded-2xl text-sm lg:text-base text-white font-medium shadow-xl">
          {question}
          
          {/* Speech Bubble Pointer */}
          <div className="absolute -left-2 top-1/2 w-0 h-0 border-t-8 border-t-slate-800 border-r-8 border-r-transparent transform -translate-y-1/2"></div>
          <div className="absolute -left-[11px] top-1/2 w-0 h-0 border-t-[9px] border-t-slate-700 border-r-[9px] border-r-transparent transform -translate-y-1/2"></div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-lg -z-10"></div>
      </div>
    </div>
  );
};