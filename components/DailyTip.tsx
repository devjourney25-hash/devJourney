"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Tag, AlertCircle, Lightbulb, Eye, Sparkles } from "lucide-react";

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

export const DailyTip = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState<Tip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchDate, setLastFetchDate] = useState<string | null>(null);

  const fetchDailyTip = async (bypassCache = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const url = bypassCache 
        ? `/api/daily-tip?t=${Date.now()}` 
        : '/api/daily-tip';
      
      const response = await fetch(url, {
        cache: bypassCache ? 'no-store' : 'default',
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No tips available today');
        }
        throw new Error('Failed to load tip');
      }
      
      const tip = await response.json();
      setCurrentTip(tip);
      
      const today = new Date().toDateString();
      setLastFetchDate(today);
      localStorage.setItem('dailyTipDate', today);
      localStorage.setItem('dailyTip', JSON.stringify(tip));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setCurrentTip(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedDate = localStorage.getItem('dailyTipDate');
    const cachedTip = localStorage.getItem('dailyTip');
    const today = new Date().toDateString();
    
    if (cachedDate === today && cachedTip) {
      try {
        const tip = JSON.parse(cachedTip);
        setCurrentTip(tip);
        setLastFetchDate(today);
        setLoading(false);
      } catch (err) {
        fetchDailyTip(true);
      }
    } else {
      fetchDailyTip(true);
    }

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 100);
    
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const midnightTimer = setTimeout(() => {
      fetchDailyTip(true);
    }, msUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700 p-4 w-full shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-yellow-500/20 p-2 rounded-lg border border-yellow-500/30">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
          </div>
          <h3 className="font-bold text-white text-base">Daily Tip</h3>
        </div>
        <div className="animate-pulse space-y-2">
          <div className="h-3 bg-slate-700 rounded w-3/4"></div>
          <div className="h-3 bg-slate-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !currentTip) {
    return (
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700 p-4 w-full shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-red-500/20 p-2 rounded-lg border border-red-500/30">
            <AlertCircle className="w-4 h-4 text-red-400" />
          </div>
          <h3 className="font-bold text-white text-base">Daily Tip</h3>
        </div>
        <p className="text-sm text-red-300 mb-3">{error}</p>
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-xs bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30" 
          onClick={() => fetchDailyTip(true)}
        >
          Try Again
        </Button>
      </div>
    );
  }

  // Main component
  return (
    <>
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700 p-4 w-full shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-500/20 p-2 rounded-lg border border-yellow-500/30">
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
            <h3 className="font-bold text-white text-base">Daily Tip</h3>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs h-7 px-3 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all"
            onClick={() => setIsOpen(true)}
          >
            <Eye size={12} className="mr-1" />
            View
          </Button>
        </div>

        <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/20 rounded-xl p-3 backdrop-blur-sm">
          <h4 className="text-sm font-medium text-gray-200 leading-tight">
            {currentTip.title}
          </h4>
        </div>
      </div>

      {/* Modal for full details */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl w-full mx-4 bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
              <div className="bg-yellow-500/20 p-2 rounded-lg border border-yellow-500/30">
                <Calendar className="w-5 h-5 text-yellow-400" />
              </div>
              Today's Tip
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              View today's helpful tip and recommendation
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl p-5">
              <div className="flex items-start justify-between mb-4 gap-3">
                <h4 className="text-lg font-semibold text-white flex-1">
                  {currentTip.title}
                </h4>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {currentTip.category && (
                    <span className="inline-flex items-center px-2.5 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                      <Tag size={10} className="mr-1" />
                      {currentTip.category}
                    </span>
                  )}
                  {currentTip.priority && (
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                      currentTip.priority === 'HIGH' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                      currentTip.priority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                      'bg-green-500/20 text-green-300 border-green-500/30'
                    }`}>
                      {currentTip.priority}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-base text-gray-300 leading-relaxed">
                {currentTip.description}
              </p>
            </div>
            
            <div className="text-xs text-gray-500 text-center pt-2 border-t border-slate-700">
              Updated: {new Date(currentTip.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DailyTip;