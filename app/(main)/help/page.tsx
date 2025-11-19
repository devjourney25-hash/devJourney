import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress, getTopTenUsers } from "@/db/queries";
import { redirect } from "next/navigation";
import { FeedWrapper } from "@/components/feed-wrapper";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Quest } from "@/components/quest";
import { Leaderboard } from "@/components/leaderboard";
import { DailyTip } from "@/components/DailyTip";
import Link from "next/link";
import { Code, Gamepad2, BookOpen, Target, Heart, Mail } from "lucide-react";

const HelpPage = async () => {
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

    // Fix for TypeScript error: Handle null imageSrc
    if (!userProgress.activeCourse.imageSrc) {
        redirect("/courses");
    }
    
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={{
                        ...userProgress.activeCourse,
                        imageSrc: userProgress.activeCourse.imageSrc
                    }}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                />
                <DailyTip />
                <Leaderboard />
                <Quest points={userProgress.points} />
            </StickyWrapper>

            <FeedWrapper>
                <div className="space-y-8 pb-10">
                    {/* Hero Section */}
                    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 overflow-hidden border border-slate-700">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                        <div className="relative text-center space-y-4">
                            <div className="flex justify-center">
                                <Image 
                                    src="/LOGO.png" 
                                    alt="DevJourney Logo" 
                                    width={200} 
                                    height={200}
                                    className="drop-shadow-2xl"
                                    style={{ width: 'auto', height: 'auto' }}
                                />
                            </div>
                            <h1 className="text-4xl font-bold text-white">
                                Welcome to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">DevJourney</span>
                            </h1>
                            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                                Your interactive learning platform for mastering programming languages through gamified experiences and structured roadmaps.
                            </p>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">About DevJourney</h2>
                        </div>
                        <div className="space-y-4 text-gray-300">
                            <p className="text-lg leading-relaxed">
                                DevJourney is a comprehensive web-based interactive learning platform designed to help aspiring developers master programming languages through engaging, self-paced tutorials and hands-on exercises.
                            </p>
                            <p className="leading-relaxed">
                                Our platform addresses the growing demand for accessible, user-centered educational tools in computer programming by providing structured learning paths, gamified experiences, and real-time practice opportunities.
                            </p>
                        </div>
                    </div>

                    {/* Key Features */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                        <h2 className="text-2xl font-bold text-white mb-6">Platform Features</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                    <Code className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">Interactive Learning</h3>
                                    <p className="text-sm text-gray-400">
                                        Self-paced lessons covering C++, Java, JavaScript, HTML, CSS, Python, PHP, and MySQL with hands-on coding exercises.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                    <Gamepad2 className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">Gamified Experience</h3>
                                    <p className="text-sm text-gray-400">
                                        Earn achievements, maintain learning streaks, and track your progress with engaging gamification features.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                    <Target className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">Structured Roadmaps</h3>
                                    <p className="text-sm text-gray-400">
                                        Follow clear learning paths for web development, mobile applications, and system development goals.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                    <BookOpen className="w-6 h-6 text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">Interactive Quizzes</h3>
                                    <p className="text-sm text-gray-400">
                                        Reinforce your understanding with comprehensive quizzes designed to improve knowledge retention.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Vision */}
                    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
                        <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            DevJourney aims to provide an effective, accessible, and engaging learning environment that empowers students and aspiring developers to master programming languages through interactive tutorials, gamified learning, and personalized educational resources.
                        </p>
                        <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                            <p className="text-sm text-gray-400 italic">
                                "By following the Agile methodology, our development process remains flexible, user-centered, and responsive to educational needs, ensuring that the platform evolves to meet the demands of learners and educators."
                            </p>
                        </div>
                    </div>

                    {/* Connect With Us */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">Connect With Us</h2>
                        <div className="flex justify-center gap-6">
                            <Link 
                                href="https://facebook.com" 
                                target="_blank"
                                className="group"
                            >
                                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors border border-blue-500/30">
                                    <Image 
                                        src="/facebook (1).png" 
                                        alt="Facebook" 
                                        width={32} 
                                        height={32}
                                        style={{ width: 'auto', height: 'auto' }}
                                    />
                                </div>
                            </Link>
                            <Link 
                                href="https://twitter.com" 
                                target="_blank"
                                className="group"
                            >
                                <div className="w-16 h-16 rounded-full bg-sky-500/20 flex items-center justify-center group-hover:bg-sky-500/30 transition-colors border border-sky-500/30">
                                    <Image 
                                        src="/twitter.png" 
                                        alt="Twitter" 
                                        width={32} 
                                        height={32}
                                        style={{ width: 'auto', height: 'auto' }}
                                    />
                                </div>
                            </Link>
                            <Link 
                                href="https://instagram.com" 
                                target="_blank"
                                className="group"
                            >
                                <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:bg-pink-500/30 transition-colors border border-pink-500/30">
                                    <Image 
                                        src="/instagram.png" 
                                        alt="Instagram" 
                                        width={32} 
                                        height={32}
                                        style={{ width: 'auto', height: 'auto' }}
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Heart className="w-8 h-8 text-red-400" />
                            <h2 className="text-2xl font-bold text-white">Support DevJourney</h2>
                        </div>
                        <p className="text-center text-gray-300 mb-6">
                            Your support helps us improve the platform and create better learning experiences for aspiring developers!
                        </p>
                        <div className="flex justify-center gap-8 flex-wrap">
                            <Link 
                                href="https://gcash.com" 
                                target="_blank"
                                className="group"
                            >
                                <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 group-hover:border-slate-600 transition-colors">
                                    <Image 
                                        src="/gcash.png" 
                                        alt="GCash" 
                                        width={80} 
                                        height={40} 
                                        className="object-contain"
                                        style={{ width: 'auto', height: 'auto' }}
                                    />
                                </div>
                            </Link>
                            <Link 
                                href="https://paypal.com" 
                                target="_blank"
                                className="group"
                            >
                                <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 group-hover:border-slate-600 transition-colors">
                                    <Image 
                                        src="/paypal.webp" 
                                        alt="PayPal" 
                                        width={80} 
                                        height={40} 
                                        className="object-contain"
                                        style={{ width: 'auto', height: 'auto' }}
                                    />
                                </div>
                            </Link>
                            <Link 
                                href="https://paymaya.com" 
                                target="_blank"
                                className="group"
                            >
                                <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 group-hover:border-slate-600 transition-colors">
                                    <Image 
                                        src="/PayMayaLogo.jpg" 
                                        alt="PayMaya" 
                                        width={80} 
                                        height={40} 
                                        className="object-contain"
                                        style={{ width: 'auto', height: 'auto' }}
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Contact Footer */}
                    <div className="bg-slate-800 rounded-2xl p-6 text-center border border-slate-700">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Mail className="w-5 h-5 text-blue-400" />
                            <p className="text-white font-medium">Have questions or feedback?</p>
                        </div>
                        <p className="text-gray-400 text-sm">
                            We'd love to hear from you and help improve your learning experience.
                        </p>
                    </div>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default HelpPage;