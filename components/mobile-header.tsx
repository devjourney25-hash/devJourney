"use client";

import MobileSidebar from "./mobile-sidebar";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Tag } from "lucide-react";

interface Tip {
  id: number;
  title: string;
  description: string;
  category?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState<Tip | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTipClick = async () => {
    // Try to get cached tip first
    const cachedDate = localStorage.getItem('dailyTipDate');
    const cachedTip = localStorage.getItem('dailyTip');
    const today = new Date().toDateString();
    
    if (cachedDate === today && cachedTip) {
      try {
        const tip = JSON.parse(cachedTip);
        setCurrentTip(tip);
        setIsOpen(true);
        return;
      } catch (err) {
        // If cache fails, fetch from API
      }
    }

    // Fetch from API if no cache
    setLoading(true);
    try {
      const response = await fetch('/api/daily-tip');
      if (response.ok) {
        const tip = await response.json();
        setCurrentTip(tip);
        setIsOpen(true);
      }
    } catch (err) {
      console.error('Failed to fetch tip:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="lg:hidden px-3 sm:px-6 h-[60px] flex items-center justify-between bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 fixed top-0 w-full z-50 shadow-lg">
        <MobileSidebar />
        
        {/* Logo - Responsive sizing */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-center mx-2">
          <Image 
            src="/LOGO.png" 
            alt="DevJourney" 
            width={28} 
            height={28}
            className="rounded-lg sm:w-8 sm:h-8"
            style={{ width: 'auto', height: 'auto' }}
          />
          <h1 className="text-base sm:text-xl font-bold text-white whitespace-nowrap">
            DevJourney
          </h1>
        </div>
        
        {/* Daily Tip Icon - Responsive sizing */}
        <button
          onClick={handleTipClick}
          disabled={loading}
          className="p-1.5 sm:p-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 hover:border-yellow-500/40 transition-all duration-300 active:scale-95 hover:shadow-lg hover:shadow-yellow-500/20 disabled:opacity-50 flex-shrink-0"
          aria-label="View daily tip"
        >
          <Sparkles className={`h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </nav>

      {/* Daily Tip Modal - Fully responsive */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-2xl mx-auto bg-slate-900 border-slate-700 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2 text-white">
              <div className="bg-yellow-500/20 p-1.5 sm:p-2 rounded-lg border border-yellow-500/30 flex-shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              </div>
              <span className="truncate">Today's Tip</span>
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              View today's helpful tip and recommendation
            </DialogDescription>
          </DialogHeader>
          
          {currentTip && (
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row items-start justify-between mb-3 sm:mb-4 gap-2 sm:gap-3">
                  <h4 className="text-base sm:text-lg font-semibold text-white flex-1 break-words">
                    {currentTip.title}
                  </h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    {currentTip.category && (
                      <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 whitespace-nowrap">
                        <Tag size={10} className="mr-1 flex-shrink-0" />
                        <span className="truncate max-w-[100px]">{currentTip.category}</span>
                      </span>
                    )}
                    {currentTip.priority && (
                      <span className={`text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border whitespace-nowrap ${
                        currentTip.priority === 'HIGH' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                        currentTip.priority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                        'bg-green-500/20 text-green-300 border-green-500/30'
                      }`}>
                        {currentTip.priority}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed break-words">
                  {currentTip.description}
                </p>
              </div>
              
              <div className="text-xs text-gray-500 text-center pt-2 border-t border-slate-700">
                Updated: {new Date(currentTip.updatedAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};