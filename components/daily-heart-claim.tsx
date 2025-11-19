"use client";

import { useState, useTransition } from "react";
import { Heart, Clock } from "lucide-react";
import { claimDailyHeart } from "@/actions/user-progress";
import { toast } from "sonner";

type DailyHeartClaimProps = {
  lastClaim: Date | null;
  currentHearts: number;
  maxHearts: number;
};

export const DailyHeartClaim = ({ 
  lastClaim, 
  currentHearts,
  maxHearts 
}: DailyHeartClaimProps) => {
  const [isPending, startTransition] = useTransition();
  
  const now = new Date();
  const canClaim = !lastClaim || 
    (now.getTime() - new Date(lastClaim).getTime()) / (1000 * 60 * 60) >= 24;
  
  const getTimeLeft = () => {
    if (!lastClaim) return null;
    const hoursPassed = (now.getTime() - new Date(lastClaim).getTime()) / (1000 * 60 * 60);
    const hoursLeft = Math.ceil(24 - hoursPassed);
    return hoursLeft > 0 ? hoursLeft : 0;
  };

  const timeLeft = getTimeLeft();
  const isFull = currentHearts >= maxHearts;

  const handleClaim = () => {
    startTransition(async () => {
      try {
        await claimDailyHeart();
        toast.success("Daily heart claimed! ❤️");
      } catch (error: any) {
        toast.error(error.message || "Failed to claim daily heart");
      }
    });
  };

  return (
    <div className="w-full bg-gradient-to-br from-rose-900/30 to-pink-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-rose-500/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-500/20 flex items-center justify-center border-2 border-rose-500/30">
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-rose-400 fill-rose-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg">Daily Heart</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Claim 1 free heart every 24 hours
            </p>
          </div>
        </div>
      </div>

      {isFull ? (
        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-500/20 border border-gray-500/30">
          <Heart className="w-5 h-5 text-gray-400 fill-gray-400" />
          <span className="text-sm font-bold text-gray-400">Hearts Full</span>
        </div>
      ) : canClaim ? (
        <button
          onClick={handleClaim}
          disabled={isPending}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Heart className="w-5 h-5 fill-white" />
          {isPending ? "Claiming..." : "Claim Daily Heart"}
        </button>
      ) : (
        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600/50">
          <Clock className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-bold text-gray-300">
            Available in {timeLeft} {timeLeft === 1 ? "hour" : "hours"}
          </span>
        </div>
      )}
    </div>
  );
};