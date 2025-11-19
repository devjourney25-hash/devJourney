import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getTopTenUsers } from "@/db/queries";
import { redirect } from "next/navigation";
import { FeedWrapper } from "@/components/feed-wrapper";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Quest } from "@/components/quest";
import { DailyTip } from "@/components/DailyTip";
import { Trophy, Medal, Award } from "lucide-react";

const LeaderboardPage = async () => {
    const userProgressData = getUserProgress();
    const leaderboardData = getTopTenUsers();

    const [
        userProgress,
        leaderboard
    ] = await Promise.all([
        userProgressData,
        leaderboardData,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    // Add null check for imageSrc
    if (!userProgress.activeCourse.imageSrc) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={{
                        ...userProgress.activeCourse,
                        imageSrc: userProgress.activeCourse.imageSrc // Now guaranteed non-null
                    }}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                />
                <DailyTip />
                <Quest points={userProgress.points} />
            </StickyWrapper>

            <FeedWrapper>
                <div className="w-full flex flex-col items-center max-w-3xl mx-auto">
                    {/* Header Section */}
                    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 mb-6 w-full border border-slate-700">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-purple-500/10 rounded-2xl"></div>
                        <div className="relative flex flex-col items-center">
                            <div className="bg-yellow-500/20 p-4 rounded-full mb-4 border border-yellow-500/30">
                                <Trophy className="w-12 h-12 text-yellow-400" />
                            </div>
                            <h1 className="text-center font-bold text-white text-4xl mb-2">
                                Leaderboard
                            </h1>
                            <p className="text-gray-400 text-center text-lg">
                                See where you stand among other learners
                            </p>
                        </div>
                    </div>

                    {/* Leaderboard List */}
                    <div className="w-full space-y-3">
                        {leaderboard.map((userProgress, index) => {
                            const isTop3 = index < 3;
                            const isFirst = index === 0;
                            const isSecond = index === 1;
                            const isThird = index === 2;

                            return (
                                <div
                                    key={userProgress.userId}
                                    className={`relative flex items-center w-full p-4 px-6 rounded-xl transition-all border ${
                                        isFirst
                                            ? "bg-gradient-to-r from-yellow-900/30 to-yellow-800/20 border-yellow-500/30 shadow-lg shadow-yellow-500/10"
                                            : isSecond
                                            ? "bg-gradient-to-r from-gray-700/30 to-gray-600/20 border-gray-500/30"
                                            : isThird
                                            ? "bg-gradient-to-r from-amber-900/30 to-amber-800/20 border-amber-600/30"
                                            : "bg-slate-800/40 border-slate-700/50 hover:border-slate-600"
                                    }`}
                                >
                                    {/* Rank Badge */}
                                    <div
                                        className={`flex justify-center items-center font-bold h-10 w-10 rounded-full mr-4 ${
                                            isFirst
                                                ? "bg-yellow-500/20 text-yellow-400 border-2 border-yellow-500/40"
                                                : isSecond
                                                ? "bg-gray-400/20 text-gray-300 border-2 border-gray-500/40"
                                                : isThird
                                                ? "bg-amber-600/20 text-amber-400 border-2 border-amber-600/40"
                                                : "bg-slate-700/50 text-gray-400 border-2 border-slate-600"
                                        }`}
                                    >
                                        {isFirst ? (
                                            <Trophy className="w-5 h-5" />
                                        ) : isSecond ? (
                                            <Medal className="w-5 h-5" />
                                        ) : isThird ? (
                                            <Award className="w-5 h-5" />
                                        ) : (
                                            index + 1
                                        )}
                                    </div>

                                    {/* Avatar */}
                                    <Avatar
                                        className={`h-14 w-14 mr-4 border-2 ${
                                            isFirst
                                                ? "border-yellow-500/60"
                                                : isSecond
                                                ? "border-gray-400/60"
                                                : isThird
                                                ? "border-amber-600/60"
                                                : "border-slate-600"
                                        }`}
                                    >
                                        <AvatarImage
                                            className="object-cover"
                                            src={userProgress.userImageSrc}
                                        />
                                    </Avatar>

                                    {/* Username */}
                                    <p className="font-bold text-white flex-1 text-lg">
                                        {userProgress.userName}
                                    </p>

                                    {/* Points Badge */}
                                    <div
                                        className={`flex items-center px-4 py-2 rounded-full ${
                                            isFirst
                                                ? "bg-yellow-500/20 border border-yellow-500/30"
                                                : isSecond
                                                ? "bg-gray-500/20 border border-gray-500/30"
                                                : isThird
                                                ? "bg-amber-600/20 border border-amber-600/30"
                                                : "bg-blue-500/20 border border-blue-500/30"
                                        }`}
                                    >
                                        <p
                                            className={`font-bold ${
                                                isFirst
                                                    ? "text-yellow-400"
                                                    : isSecond
                                                    ? "text-gray-300"
                                                    : isThird
                                                    ? "text-amber-400"
                                                    : "text-blue-400"
                                            }`}
                                        >
                                            {userProgress.points} XP
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {leaderboard.length === 0 && (
                        <div className="bg-slate-800/40 rounded-2xl p-12 border border-slate-700 text-center w-full">
                            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 text-lg">
                                No learners on the leaderboard yet.
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                                Be the first to earn points and climb to the top!
                            </p>
                        </div>
                    )}
                </div>
            </FeedWrapper>
        </div>
    );
};

export default LeaderboardPage;