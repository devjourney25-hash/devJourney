import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getCourses } from "@/db/queries";
import { redirect } from "next/navigation";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Quest } from "@/components/quest";
import { Leaderboard } from "@/components/leaderboard";
import { DailyTip } from "@/components/DailyTip";
import { Trophy, Award, Target, BookOpen, Code, Heart, Zap, Star, CheckCircle, Lock } from "lucide-react";
import Image from "next/image";

const AchievementsPage = async () => {
  const userProgressData = getUserProgress();
  const coursesData = getCourses();

  const [userProgress, courses] = await Promise.all([
    userProgressData,
    coursesData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  // Fix 1: Handle null imageSrc for activeCourse
  if (!userProgress.activeCourse.imageSrc) {
    redirect("/courses");
  }

  // Calculate achievement stats
  const totalPoints = userProgress.points;
  const totalHearts = userProgress.hearts;
  
  // Achievement milestones
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Earn your first 10 XP",
      icon: Star,
      unlocked: totalPoints >= 10,
      progress: Math.min((totalPoints / 10) * 100, 100),
      reward: "10 XP",
      category: "beginner",
    },
    {
      id: 2,
      title: "Quick Learner",
      description: "Earn 100 XP",
      icon: Zap,
      unlocked: totalPoints >= 100,
      progress: Math.min((totalPoints / 100) * 100, 100),
      reward: "50 XP Bonus",
      category: "beginner",
    },
    {
      id: 3,
      title: "Dedicated Student",
      description: "Earn 500 XP",
      icon: BookOpen,
      unlocked: totalPoints >= 500,
      progress: Math.min((totalPoints / 500) * 100, 100),
      reward: "100 XP Bonus",
      category: "intermediate",
    },
    {
      id: 4,
      title: "Master Coder",
      description: "Earn 1000 XP",
      icon: Code,
      unlocked: totalPoints >= 1000,
      progress: Math.min((totalPoints / 1000) * 100, 100),
      reward: "200 XP Bonus",
      category: "advanced",
    },
    {
      id: 5,
      title: "Survivor",
      description: "Maintain 5 hearts",
      icon: Heart,
      unlocked: totalHearts >= 5,
      progress: Math.min((totalHearts / 5) * 100, 100),
      reward: "1 Extra Heart",
      category: "special",
    },
    {
      id: 6,
      title: "Course Complete",
      description: "Complete your first programming language course",
      icon: Trophy,
      unlocked: false, // You'd check if user completed any course
      progress: 0,
      reward: "500 XP + Badge",
      category: "milestone",
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

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
        <Leaderboard />
        <Quest points={userProgress.points} />
      </StickyWrapper>

      <FeedWrapper>
        <div className="w-full space-y-8">
          {/* Header Section */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-purple-500/10"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/20 p-4 rounded-xl border border-yellow-500/30">
                  <Trophy className="w-10 h-10 text-yellow-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">Achievements</h1>
                  <p className="text-gray-400 text-lg">
                    {unlockedCount} of {achievements.length} unlocked
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Total XP Earned</p>
                <p className="text-3xl font-bold text-blue-400">{totalPoints}</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-500/30">
                  <Award className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Points</p>
                  <p className="text-2xl font-bold text-white">{totalPoints}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-500/20 p-3 rounded-lg border border-red-500/30">
                  <Heart className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Current Hearts</p>
                  <p className="text-2xl font-bold text-white">{totalHearts}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/30">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Achievements</p>
                  <p className="text-2xl font-bold text-white">{unlockedCount}/{achievements.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Your Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`relative rounded-xl p-6 border transition-all duration-300 ${
                      achievement.unlocked
                        ? "bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30 shadow-lg shadow-yellow-500/10"
                        : "bg-slate-800/40 border-slate-700 opacity-70"
                    }`}
                  >
                    {/* Locked Overlay */}
                    {!achievement.unlocked && (
                      <div className="absolute top-4 right-4">
                        <Lock className="w-5 h-5 text-gray-500" />
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`p-4 rounded-xl border flex-shrink-0 ${
                          achievement.unlocked
                            ? "bg-yellow-500/20 border-yellow-500/30"
                            : "bg-slate-700/30 border-slate-600"
                        }`}
                      >
                        <Icon
                          className={`w-8 h-8 ${
                            achievement.unlocked ? "text-yellow-400" : "text-gray-500"
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3
                            className={`text-lg font-bold ${
                              achievement.unlocked ? "text-white" : "text-gray-400"
                            }`}
                          >
                            {achievement.title}
                          </h3>
                          {achievement.unlocked && (
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mb-3">
                          {achievement.description}
                        </p>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-500">Progress</span>
                            <span className="text-xs font-semibold text-gray-400">
                              {Math.round(achievement.progress)}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                achievement.unlocked
                                  ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                  : "bg-gradient-to-r from-blue-500 to-purple-500"
                              }`}
                              style={{ width: `${achievement.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Reward */}
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            achievement.unlocked
                              ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                              : "bg-slate-700/30 text-gray-500 border border-slate-600"
                          }`}
                        >
                          <Award className="w-3 h-3" />
                          {achievement.reward}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Course Progress Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Course Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => {
                const isActive = userProgress.activeCourseId === course.id;
                const isCompleted = false; // You'd check if course is completed

                // Fix 2: Skip courses with null imageSrc or provide fallback
                if (!course.imageSrc) {
                  return null; // Skip this course
                }

                return (
                  <div
                    key={course.id}
                    className={`relative rounded-xl p-6 border transition-all ${
                      isActive
                        ? "bg-blue-900/30 border-blue-500/30"
                        : "bg-slate-800/40 border-slate-700"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/30">
                          Active
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="relative w-20 h-20 bg-slate-700/30 rounded-xl p-3">
                        <Image
                          src={course.imageSrc}
                          alt={course.title}
                          fill
                          sizes="80px"
                          className="object-contain p-2"
                        />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {isCompleted ? "Completed" : "In Progress"}
                        </p>
                      </div>

                      {isCompleted && (
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm font-semibold">Complete!</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default AchievementsPage;