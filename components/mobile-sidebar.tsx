"use client";
import * as React from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { SidebarItem } from "./sidebar-item";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

      {/* Sidebar Sheet - removed default close button */}
      <SheetContent
        side="left"
        className="p-0 w-[280px] bg-slate-900 border-r border-slate-700 shadow-2xl transition-transform duration-500 ease-out [&>button]:hidden"
      >
        {/* Accessibility: Hidden title and description */}
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Access all navigation links including Learn, Lessons, IDE, Leaderboard, Quests, Shop, and Help & Support
        </SheetDescription>

        {/* Full Sidebar Content */}
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <Link href="/learn" onClick={() => setOpen(false)}>
            <div className="pt-6 pl-6 pr-6 pb-6 flex items-center gap-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-lg group-hover:bg-blue-500/30 transition-all"></div>
                <div className="relative bg-slate-800 p-1.5 rounded-lg border border-slate-700 group-hover:border-slate-600 transition-all">
                  <Image 
                    src="/LOGO.png" 
                    height={32} 
                    width={32} 
                    alt="Logo" 
                    className="rounded"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors">
                DevJourney
              </h1>
            </div>
          </Link>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-4"></div>

          {/* Navigation Items */}
          <div className="flex flex-col gap-y-2 flex-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent px-4">
            <div onClick={() => setOpen(false)}>
              <SidebarItem label="Learn" href="/learn" iconSrc="/reading-book.png" />
            </div>
            <div onClick={() => setOpen(false)}>
              <SidebarItem label="Lesson" href="/lessonModule" iconSrc="/open-book (1).png" />
            </div>
            <div onClick={() => setOpen(false)}>
              <SidebarItem label="IDE" href="/ide" iconSrc="/Ide.png" />
            </div>
            <div onClick={() => setOpen(false)}>
              <SidebarItem label="Leaderboard" href="/leaderboard" iconSrc="/podium.png" />
            </div>
            <div onClick={() => setOpen(false)}>
              <SidebarItem label="Quest" href="/quest" iconSrc="/paper.png" />
            </div>
            <div onClick={() => setOpen(false)}>
              <SidebarItem label="Shop" href="/shop" iconSrc="/shopping-bag.png" />
            </div>
            <div onClick={() => setOpen(false)}>
              <SidebarItem label="Help & Support" href="/help" iconSrc="/faq.png" />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent my-4"></div>

          {/* User Section */}
          <div className="p-4 mx-4 mb-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <ClerkLoading>
              <div className="flex items-center justify-center">
                <Loader className="h-5 w-5 text-gray-400 animate-spin" />
              </div>
            </ClerkLoading>
            <ClerkLoaded>
              <div className="flex items-center gap-3">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                    }
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Account</p>
                  <p className="text-xs text-gray-400">Manage profile</p>
                </div>
              </div>
            </ClerkLoaded>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;