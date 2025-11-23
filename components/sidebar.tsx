"use client";
import { Loader, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { SidebarItem } from "./sidebar-item";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import Image from "next/image";

type Props = {
  className?: string;
  onClose?: () => void;
};

const Sidebar = ({ className, onClose }: Props) => {
  return (
    <aside
      className={cn(
        "bg-slate-900 h-screen w-[256px] text-white p-4 fixed top-0 left-0 z-50 flex flex-col border-r border-slate-700 shadow-2xl",
        "max-[256px]:hidden",
        className
      )}
      role="navigation"
      aria-label="Main sidebar navigation"
    >
      {/* Mobile Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      {/* Logo Section */}
      <Link href="/learn">
        <div className="pt-6 pl-2 pb-6 flex items-center gap-x-3 group cursor-pointer">
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
      <div className="flex flex-col gap-y-2 flex-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
         <SidebarItem label="Lesson" href="/lessonModule" iconSrc="/open-book (1).png" />
        <SidebarItem label="Learn" href="/learn" iconSrc="/reading-book.png" />
       
        <SidebarItem label="IDE" href="/ide" iconSrc="/Ide.png" />
        <SidebarItem label="Leaderboard" href="/leaderboard" iconSrc="/podium.png" />
        <SidebarItem label="Quest" href="/quest" iconSrc="/paper.png" />
        <SidebarItem label="Shop" href="/shop" iconSrc="/shopping-bag.png" />
        <SidebarItem label="About Us" href="/help" iconSrc="/faq.png" />
       
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent my-4"></div>

      {/* User Section */}
      <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700">
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
    </aside>
  );
};

export default Sidebar;