import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCourses } from "@/db/queries";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getIsAdmin } from "@/lib/admin";

export default async function LandingPage() {
  // Check if user is authenticated
  const { userId } = await auth();
  
  // If user is signed in, redirect them
  if (userId) {
    const isAdmin = await getIsAdmin();
    
    if (isAdmin) {
      redirect("/admin");
    } else {
      redirect("/learn");
    }
  }

  // Only fetch courses if user is NOT signed in
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-20 backdrop-blur-lg border-b border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/LOGO.png" alt="DevJourney" className="w-10 h-10 rounded-lg" />
            <span className="text-2xl font-bold text-white">DevJourney</span>
          </div>
         
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-purple-500 bg-opacity-20 rounded-full text-purple-300 text-sm font-medium border border-purple-500 border-opacity-30">
                  🚀 Interactive Learning Platform
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Master Programming
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  At Your Own Pace
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Comprehensive programming courses with interactive tutorials, hands-on exercises, and structured learning paths designed for aspiring developers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="hologram"
                  className="text-lg px-8 py-6"
                  asChild
                >
                  <Link href="/marketing">
                    Start Learning Free
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="sidebar"
                  className="text-lg px-8 py-6"
                  asChild
                >
                  <Link href="#courses">
                    Explore Courses
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <p className="text-3xl font-bold text-white">Multiple</p>
                  <p className="text-gray-400 text-sm">Programming Languages</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">100%</p>
                  <p className="text-gray-400 text-sm">Self-Paced Learning</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">24/7</p>
                  <p className="text-gray-400 text-sm">Access Anywhere</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30"></div>
              <img 
                src="/LOGO.png" 
                alt="DevJourney Platform" 
                className="relative rounded-3xl shadow-2xl border border-white border-opacity-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Available Courses Section */}
      <section id="courses" className="py-20 px-6 bg-black bg-opacity-30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Available Programming Courses
            </h2>
            <p className="text-xl text-gray-400">
              Choose your path and start your development journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="group relative p-8 rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative w-20 h-20 mb-6 mx-auto bg-slate-700/30 rounded-xl p-3 group-hover:bg-slate-700/50 transition-all">
                  {course.imageSrc && (
                    <Image
                      src={course.imageSrc}
                      alt={course.title}
                      fill
                      className="object-contain p-2"
                    />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 text-center group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-gray-400 text-center text-sm leading-relaxed">
                  Master {course.title} with comprehensive tutorials and hands-on practice.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose DevJourney?
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to become a skilled developer
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Interactive Learning */}
            <div className="group p-8 rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Interactive Tutorials</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Self-paced lessons with hands-on coding exercises and real-time feedback.
              </p>
            </div>

            {/* Gamified Learning */}
            <div className="group p-8 rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-all">
                <span className="text-3xl">🎮</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Gamified Experience</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Earn achievements, maintain streaks, and track your progress with engaging features.
              </p>
            </div>

            {/* Structured Roadmaps */}
            <div className="group p-8 rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-all">
                <span className="text-3xl">🗺️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Structured Roadmaps</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Clear learning paths for web development, mobile apps, and system development.
              </p>
            </div>

            {/* Practice Quizzes */}
            <div className="group p-8 rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-all">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Interactive Quizzes</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Test your knowledge and reinforce learning with comprehensive practice exercises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-purple-900 to-pink-900 bg-opacity-30 border border-purple-500 border-opacity-30 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Ready to Begin Your Development Journey?
              </h2>
              <p className="text-xl text-gray-300">
                Join aspiring developers mastering programming through interactive, engaging learning experiences.
              </p>
              <Button
                size="lg"
                variant="hologram"
                className="text-lg px-10 py-6 mt-4"
                asChild
              >
                <Link href="/marketing">
                  Start Learning Now →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white border-opacity-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 DevJourney. Empowering aspiring developers worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}