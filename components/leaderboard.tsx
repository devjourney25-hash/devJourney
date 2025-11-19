import { getTopTenUsers } from "@/db/queries";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trophy, Medal, Award, ChevronRight } from "lucide-react";

export const Leaderboard = async () => {
    const leaderboardData = getTopTenUsers();
    const [leaderboard] = await Promise.all([leaderboardData]);
    
    const topThree = leaderboard.slice(0, 3);
    const remainingUsers = leaderboard.slice(3);
    
    return (
        <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between w-full mb-4">
                <div className="flex items-center gap-2">
                    <div className="bg-yellow-500/20 p-2 rounded-lg border border-yellow-500/30">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                    </div>
                    <h3 className="font-bold text-white text-base">Leaderboard</h3>
                </div>
                <Link href="/leaderboard">
                    <Button 
                        size="xs" 
                        variant="ghost"
                        className="text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all group">
                        View all
                        <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                </Link>
            </div>
            
            <Separator className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-slate-600 to-transparent"/>
            
            <div className="w-full space-y-2">
                {/* Top 3 Users */}
                {topThree.map((userProgress, index) => {
                    const isFirst = index === 0;
                    const isSecond = index === 1;
                    const isThird = index === 2;

                    return (
                        <div
                            key={userProgress.userId}
                            className={`flex items-center w-full p-2 px-3 rounded-lg transition-all border ${
                                isFirst
                                    ? "bg-gradient-to-r from-yellow-900/20 to-yellow-800/10 border-yellow-500/20 hover:border-yellow-500/30"
                                    : isSecond
                                    ? "bg-gradient-to-r from-gray-700/20 to-gray-600/10 border-gray-500/20 hover:border-gray-500/30"
                                    : "bg-gradient-to-r from-amber-900/20 to-amber-800/10 border-amber-600/20 hover:border-amber-600/30"
                            }`}
                        >
                            {/* Rank Badge with Icon */}
                            <div
                                className={`flex justify-center items-center font-bold h-7 w-7 rounded-lg mr-2 ${
                                    isFirst
                                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                        : isSecond
                                        ? "bg-gray-400/20 text-gray-300 border border-gray-500/30"
                                        : "bg-amber-600/20 text-amber-400 border border-amber-600/30"
                                }`}
                            >
                                {isFirst ? (
                                    <Trophy className="w-4 h-4" />
                                ) : isSecond ? (
                                    <Medal className="w-4 h-4" />
                                ) : (
                                    <Award className="w-4 h-4" />
                                )}
                            </div>

                            {/* Avatar */}
                            <Avatar
                                className={`h-7 w-7 mr-2 border-2 ${
                                    isFirst
                                        ? "border-yellow-500/40"
                                        : isSecond
                                        ? "border-gray-400/40"
                                        : "border-amber-600/40"
                                }`}
                            >
                                <AvatarImage
                                    className="object-cover"
                                    src={userProgress.userImageSrc}
                                />
                            </Avatar>

                            {/* Username */}
                            <p className="font-semibold text-gray-300 text-sm flex-1 truncate">
                                {userProgress.userName}
                            </p>
                        </div>
                    );
                })}
                
                {/* Remaining Users (4-10) */}
                {remainingUsers.map((userProgress, index) => (
                    <div
                        key={userProgress.userId}
                        className="flex items-center w-full p-2 px-3 rounded-lg transition-all bg-slate-700/30 border border-slate-600/50 hover:bg-slate-700/40 hover:border-slate-600"
                    >
                        {/* Rank Number */}
                        <div className="flex justify-center items-center font-semibold h-7 w-7 rounded-lg mr-2 bg-slate-600/50 text-gray-400 text-xs border border-slate-600">
                            {index + 4}
                        </div>

                        {/* Avatar */}
                        <Avatar className="h-7 w-7 mr-2 border-2 border-slate-600">
                            <AvatarImage
                                className="object-cover"
                                src={userProgress.userImageSrc}
                            />
                        </Avatar>

                        {/* Username */}
                        <p className="font-medium text-gray-400 text-sm flex-1 truncate">
                            {userProgress.userName}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};