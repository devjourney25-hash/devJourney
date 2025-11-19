import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { FeedWrapper } from "@/components/feed-wrapper";
import Image from "next/image";
import { Items } from "./items";
import { Quest } from "@/components/quest";
import { Leaderboard } from "@/components/leaderboard";
import { DailyTip } from "@/components/DailyTip";
import { ShoppingBag, Coins } from "lucide-react";

const ShopPage = async() => {
    const userProgress = await getUserProgress();

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    // Add null check for imageSrc
    if (!userProgress.activeCourse.imageSrc) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-4 md:gap-8 lg:gap-12 xl:gap-16 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
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
                <Quest points={userProgress.points} />
            </StickyWrapper>
            
            <FeedWrapper>
                <div className="w-full flex flex-col items-center max-w-3xl mx-auto">
                    {/* Header Section */}
                    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 w-full border border-slate-700">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl sm:rounded-2xl"></div>
                        <div className="relative flex flex-col items-center">
                            <div className="bg-cyan-500/20 p-3 sm:p-4 rounded-full mb-3 sm:mb-4 border border-cyan-500/30">
                                <ShoppingBag className="w-8 h-8 sm:w-10 lg:w-12 sm:h-10 lg:h-12 text-cyan-400" />
                            </div>
                            <h1 className="text-center font-bold text-white text-2xl sm:text-3xl lg:text-4xl mb-2">
                                Shop
                            </h1>
                            <p className="text-gray-400 text-center text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 px-2">
                                Spend your points on amazing items
                            </p>
                            
                                    {/* Points Display */}
                            <div className="flex items-center gap-2 bg-cyan-500/20 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-3.5 rounded-full border border-cyan-500/30">
                                <Coins className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-cyan-400" />
                                <span className="text-cyan-400 font-bold text-base sm:text-lg lg:text-xl">
                                    {userProgress.points} XP
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Shop Items */}
                    <div className="w-full bg-slate-800/40 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-slate-700">
                        <Items 
                            hearts={userProgress.hearts} 
                            points={userProgress.points} 
                        />
                    </div>

                    {/* Info Card */}
                    <div className="mt-4 sm:mt-6 w-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-blue-500/20">
                        <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-blue-400" />
                            </div>
                            <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl">How It Works</h3>
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed">
                            Earn XP by completing quizzes and spend your XP to buy hearts which can be used to continue your learning journey. Manage your points wisely and unlock new opportunities!
                        </p>
                    </div>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default ShopPage;