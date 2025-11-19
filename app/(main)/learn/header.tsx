import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  return (
    <div className="sticky top-0 bg-slate-900/95 backdrop-blur-lg pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b border-slate-700/50 lg:z-50 shadow-lg">
      <Link href="/courses">
        <Button 
          variant="ghost" 
          size="sm"
          className="hover:bg-slate-800/50 transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 stroke-2 text-gray-400 group-hover:text-blue-400 transition-colors" />
        </Button>
      </Link>
      
      <h1 className="font-bold text-xl text-white tracking-tight">
        {title}
      </h1>
      
      <div className="w-10" /> {/* Spacer for centering */}
    </div>
  );
};