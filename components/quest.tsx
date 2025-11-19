import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { quests } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Target, ChevronRight, CheckCircle2 } from "lucide-react";

type Props = {
    points: number;
};

export const Quest = ({ points }: Props) => {
    return (
        <div className="w-full flex flex-col p-4 rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between w-full mb-4">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30">
                        <Target className="w-4 h-4 text-blue-400" />
                    </div>
                    <h3 className="font-bold text-white text-base">Quests</h3>
                </div>
                <Link href="/quest">
                    <Button 
                        size="xs" 
                        variant="ghost"
                        className="text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all group">
                        View all
                        <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                </Link>
            </div>
            
            {/* Quest List */}
            <ul className="w-full space-y-3">
                {quests.slice(0, 3).map((quest, index) => {
                    const progress = (points / quest.value) * 100;
                    const cappedProgress = Math.min(100, progress);
                    const isCompleted = cappedProgress >= 100;
                    
                    return (
                        <div 
                            className={`flex items-center w-full p-3 gap-x-3 rounded-lg transition-all border ${
                                isCompleted 
                                    ? "bg-green-900/20 border-green-500/20 hover:border-green-500/30"
                                    : "bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/40 hover:border-slate-600"
                            }`}
                            key={quest.title}
                        >
                            {/* Icon */}
                            <div className={`p-2 rounded-lg flex-shrink-0 ${
                                isCompleted 
                                    ? "bg-green-500/20 border border-green-500/30" 
                                    : "bg-blue-500/20 border border-blue-500/30"
                            }`}>
                                {isCompleted ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                ) : (
                                    <Image 
                                        src="/point.png"
                                        alt="Points"
                                        width={20}
                                        height={20}
                                        className="object-contain"
                                        style={{ width: 'auto', height: 'auto' }}
                                    />
                                )}
                            </div>

                            {/* Quest Details */}
                            <div className="flex flex-col gap-y-2 w-full min-w-0">
                                <div className="flex justify-between items-center gap-2">
                                    <p className="text-gray-300 text-sm font-medium truncate">
                                        {quest.title}
                                    </p>
                                    <span className={`text-xs font-bold flex-shrink-0 px-2 py-0.5 rounded-full ${
                                        isCompleted 
                                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                    }`}>
                                        {isCompleted ? "Done!" : `${Math.round(cappedProgress)}%`}
                                    </span>
                                </div>
                                
                                {/* Progress Bar */}
                                <div className="relative">
                                    <Progress 
                                        value={cappedProgress} 
                                        className="h-2 bg-slate-700/50 rounded-full border border-slate-600/50 overflow-hidden" 
                                    />
                                    <div 
                                        className={`absolute inset-0 h-2 rounded-full transition-all ${
                                            isCompleted 
                                                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                                : "bg-gradient-to-r from-blue-500 to-purple-500"
                                        }`}
                                        style={{ width: `${cappedProgress}%` }}
                                    />
                                </div>

                                {/* Points Info */}
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500">
                                        {points} / {quest.value} XP
                                    </span>
                                    {!isCompleted && (
                                        <span className="text-gray-600">
                                            {quest.value - points} left
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};