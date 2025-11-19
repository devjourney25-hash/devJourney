"use client";
import * as React from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";
import Image from "next/image";

const MobileSidebar = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Hamburger Menu Button */}
      <SheetTrigger asChild>
        <button 
          className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700 hover:border-slate-600 transition-all duration-300 active:scale-95 hover:shadow-lg hover:shadow-blue-500/20"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-gray-300 transition-transform duration-300 hover:rotate-90" />
        </button>
      </SheetTrigger>

      {/* Sidebar Sheet */}
      <SheetContent
        side="left"
        className="p-0 w-[280px] bg-slate-900 border-r border-slate-700 shadow-2xl transition-transform duration-500 ease-out"
      >
        {/* Accessibility: Hidden title and description */}
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Access all navigation links including Learn, Lessons, IDE, Leaderboard, Quests, Shop, and Help & Support
        </SheetDescription>

        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-slate-700 bg-slate-800/50 transition-colors duration-300">
          <div className="bg-slate-700 p-1.5 rounded-lg transition-all duration-300 hover:bg-slate-600 hover:scale-105">
            <Image 
              src="/LOGO.png" 
              alt="DevJourney" 
              width={32} 
              height={32}
              className="rounded transition-transform duration-300"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide transition-colors duration-300 hover:text-blue-400">
            DevJourney
          </h1>
        </div>

        {/* Sidebar Content with smooth scroll */}
        <div className="overflow-y-auto h-[calc(100vh-73px)] scroll-smooth scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <Sidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;