import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { FeedWrapper } from "@/components/feed-wrapper";
import Image from "next/image";
import { quests } from "@/constants";
import { Leaderboard } from "@/components/leaderboard";
import { DailyTip } from "@/components/DailyTip";
import { Target, CheckCircle2, Heart } from "lucide-react";
import { ClaimHeartButton } from "@/components/claim-heart-button";
import db from "@/db/drizzle";
import { questProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

const QuestPage = async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userProgress?.activeCourse || !userId) {
    redirect("/courses");
  }

  // Add null check for imageSrc
  if (!userProgress.activeCourse.imageSrc) {
    redirect("/courses");
  }

  // Fetch all claimed quests for this user
  const claimedQuests = await db.query.questProgress.findMany({
    where: eq(questProgress.userId, userId),
  });

  return (
    <div className="flex flex-row-reverse gap-4 lg:gap-12 px-3 sm:px-6">
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
        <Leaderboard />
      </StickyWrapper>

      <FeedWrapper>
        <div className="w-full flex flex-col items-center max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 w-full border border-slate-700">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl sm:rounded-2xl"></div>
            <div className="relative flex flex-col items-center">
              <div className="bg-blue-500/20 p-3 sm:p-4 rounded-full mb-3 sm:mb-4 border border-blue-500/30">
                <Target className="w-8 h-8 sm:w-10 lg:w-12 sm:h-10 lg:h-12 text-blue-400" />
              </div>
              <h1 className="text-center font-bold text-white text-2xl sm:text-3xl lg:text-4xl mb-2">
                Quests
              </h1>
              <p className="text-gray-400 text-center text-sm sm:text-base lg:text-lg px-2">
                Complete quests by earning points and claim hearts as rewards
              </p>
            </div>
          </div>

          {/* Quests List */}
          <ul className="w-full space-y-3 sm:space-y-4">
            {quests.map((quest, index) => {
              const progress = Math.min(100, (userProgress.points / quest.value) * 100);
              const isCompleted = progress >= 100;
              const heartsReward = index + 1; // First quest = 1 heart, second = 2 hearts, etc.
              const isClaimed = claimedQuests.some((cq) => cq.questId === quest.value);

              return (
                <div
                  key={quest.title}
                  className={`relative flex flex-col sm:flex-row sm:items-center w-full p-4 sm:p-5 lg:p-6 gap-4 sm:gap-x-5 rounded-xl border transition-all ${
                    isCompleted
                      ? "bg-gradient-to-r from-green-900/30 to-green-800/20 border-green-500/30"
                      : "bg-slate-800/40 border-slate-700/50 hover:border-slate-600"
                  }`}
                >
                  {/* Mobile: Icon + Title Row */}
                  <div className="flex items-center gap-4 sm:contents">
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 p-3 sm:p-4 rounded-full ${
                        isCompleted
                          ? "bg-green-500/20 border-2 border-green-500/40"
                          : "bg-blue-500/20 border-2 border-blue-500/30"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
                      ) : (
                        <Image
                          src="/point.png"
                          alt="Points"
                          width={40}
                          height={40}
                          className="object-contain w-8 h-8 sm:w-10 sm:h-10"
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      )}
                    </div>

                    {/* Title on mobile */}
                    <div className="flex-1 sm:hidden">
                      <p className="text-white text-base font-bold">{quest.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                        <span className="text-xs text-gray-400">
                          {heartsReward} {heartsReward === 1 ? "heart" : "hearts"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quest Details */}
                  <div className="flex flex-col gap-y-3 w-full">
                    {/* Desktop: Title Row */}
                    <div className="hidden sm:flex justify-between items-center">
                      <div className="flex flex-col">
                        <p className="text-white text-base lg:text-lg font-bold">{quest.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                          <span className="text-xs lg:text-sm text-gray-400">
                            Reward: {heartsReward} {heartsReward === 1 ? "heart" : "hearts"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className={`px-3 lg:px-4 py-1.5 rounded-full ${
                            isCompleted
                              ? "bg-green-500/20 border border-green-500/30"
                              : "bg-blue-500/20 border border-blue-500/30"
                          }`}
                        >
                          <span
                            className={`text-xs lg:text-sm font-bold ${
                              isCompleted ? "text-green-400" : "text-blue-400"
                            }`}
                          >
                            {isCompleted ? "Completed!" : `${Math.round(progress)}%`}
                          </span>
                        </div>
                        {isCompleted && !isClaimed && (
                          <ClaimHeartButton 
                            questId={quest.value}
                            heartsReward={heartsReward}
                          />
                        )}
                        {isClaimed && (
                          <div className="px-3 lg:px-4 py-2 rounded-lg bg-gray-500/20 border border-gray-500/30">
                            <span className="text-xs lg:text-sm font-bold text-gray-400">Claimed</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mobile: Status and Buttons Row */}
                    <div className="flex sm:hidden justify-between items-center gap-2">
                      <div
                        className={`px-3 py-1.5 rounded-full ${
                          isCompleted
                            ? "bg-green-500/20 border border-green-500/30"
                            : "bg-blue-500/20 border border-blue-500/30"
                        }`}
                      >
                        <span
                          className={`text-xs font-bold ${
                            isCompleted ? "text-green-400" : "text-blue-400"
                          }`}
                        >
                          {isCompleted ? "Completed!" : `${Math.round(progress)}%`}
                        </span>
                      </div>
                      {isCompleted && !isClaimed && (
                        <ClaimHeartButton 
                          questId={quest.value}
                          heartsReward={heartsReward}
                        />
                      )}
                      {isClaimed && (
                        <div className="px-3 py-1.5 rounded-lg bg-gray-500/20 border border-gray-500/30">
                          <span className="text-xs font-bold text-gray-400">Claimed</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700/50 rounded-full h-2.5 sm:h-3 overflow-hidden border border-slate-600/50">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCompleted
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : "bg-gradient-to-r from-blue-500 to-purple-500"
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    {/* Points Info */}
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-400">
                        {userProgress.points} / {quest.value} XP
                      </span>
                      {!isCompleted && (
                        <span className="text-gray-500">
                          {quest.value - userProgress.points} XP left
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>

          {/* Motivation Section */}
          <div className="mt-6 sm:mt-8 w-full bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg">Keep Going!</h3>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">
              Complete quests to gain extra hearts
            </p>
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default QuestPage;