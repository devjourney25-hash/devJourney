"use client";

import Image from "next/image";
import { Button } from "@components/ui/button";
import { useTransition } from "react";
import { refillHearts, buyOneHeart, buyTwoHearts } from "@/actions/user-progress";
import { POINTS_TO_REFILL,POINTS_FOR_ONE_HEART, POINTS_FOR_TWO_HEARTS } from "@/constants";


type Props = {
  hearts: number;
  points: number;
  
};

export const Items = ({ hearts, points }: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) return;

    startTransition(async () => {
      try {
        await refillHearts();
      } catch {
        alert("Failed to refill hearts. Please try again.");
      }
    });
  };

  const onBuyOneHeart = () => {
    if (pending || hearts >= 5 || points < POINTS_FOR_ONE_HEART) return;

    startTransition(async () => {
      try {
        await buyOneHeart();
      } catch {
        alert("Failed to buy one heart. Please try again.");
      }
    });
  };

  const onBuyTwoHearts = () => {
    if (pending || hearts > 3 || points < POINTS_FOR_TWO_HEARTS) return;

    startTransition(async () => {
      try {
        await buyTwoHearts();
      } catch {
        alert("Failed to buy two hearts. Please try again.");
      }
    });
  };

  const isBuyOneHeartDisabled = pending || hearts >= 5 || points < POINTS_FOR_ONE_HEART;
  const isBuyTwoHeartsDisabled = pending || hearts > 3 || points < POINTS_FOR_TWO_HEARTS;
  const isRefillHeartsDisabled = pending || hearts === 5 || points < POINTS_TO_REFILL;

  return (
    <ul className="w-full flex flex-col gap-3 sm:gap-3.5 md:gap-4 lg:gap-5 xl:gap-6">
     
      {/* Buy One Heart */}
      <div className="flex flex-col sm:flex-row sm:items-center w-full p-3 sm:p-4 gap-3 sm:gap-x-4 border-t-2 border-cyan-200 rounded-xl sm:rounded-2xl bg-slate-800">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <Image 
            src="/heart.png" 
            alt="One Heart" 
            width={60} 
            height={60}
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-[60px] lg:h-[60px] flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-cyan-700 text-base sm:text-lg lg:text-xl font-bold">1 Heart</p>
            <p className="text-slate-400 text-xs sm:text-sm">Purchase one additional heart</p>
          </div>
        </div>
        <Button
          onClick={onBuyOneHeart}
          disabled={isBuyOneHeartDisabled}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 sm:px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg sm:rounded-xl shadow-md transition w-full sm:w-auto sm:min-w-[120px] lg:min-w-[140px] flex-shrink-0"
        >
          {hearts >= 5 ? (
            <span className="text-sm sm:text-base lg:text-lg">Full</span>
          ) : (
            <div className="flex items-center justify-center gap-x-2">
              <Image 
                src="/point.png" 
                alt="Points" 
                height={20} 
                width={20} 
                className="rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
              />
              <p className="text-white font-medium text-sm sm:text-base lg:text-lg">{POINTS_FOR_ONE_HEART}</p>
            </div>
          )}
        </Button>
      </div>

      {/* Buy Two Hearts */}
      <div className="flex flex-col sm:flex-row sm:items-center w-full p-3 sm:p-4 gap-3 sm:gap-x-4 border-t-2 border-cyan-200 rounded-xl sm:rounded-2xl bg-slate-800">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex-shrink-0">
            <Image src="/two.png" alt="Two Hearts" fill className="object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-cyan-700 text-base sm:text-lg lg:text-xl font-bold">2 Hearts</p>
            <p className="text-slate-400 text-xs sm:text-sm">Purchase two additional hearts</p>
          </div>
        </div>
        <Button
          onClick={onBuyTwoHearts}
          disabled={isBuyTwoHeartsDisabled}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 sm:px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg sm:rounded-xl shadow-md transition w-full sm:w-auto sm:min-w-[140px] lg:min-w-[180px] flex-shrink-0"
        >
          {hearts > 3 ? (
            <span className="text-xs sm:text-sm lg:text-base whitespace-nowrap">Not Enough Space</span>
          ) : (
            <div className="flex items-center justify-center gap-x-2">
              <Image 
                src="/point.png" 
                alt="Points" 
                height={20} 
                width={20} 
                className="rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
              />
              <p className="text-white font-medium text-sm sm:text-base lg:text-lg">{POINTS_FOR_TWO_HEARTS}</p>
            </div>
          )}
        </Button>
      </div>

      {/* Refill Hearts */}
      <div className="flex flex-col sm:flex-row sm:items-center w-full p-3 sm:p-4 gap-3 sm:gap-x-4 border-t-2 border-cyan-200 rounded-xl sm:rounded-2xl bg-slate-800">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <Image 
            src="/5hearts.png" 
            alt="Hearts" 
            width={80} 
            height={80}
            className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-cyan-700 text-base sm:text-lg lg:text-xl font-bold">Refill Hearts</p>
            <p className="text-slate-400 text-xs sm:text-sm">Fill all hearts to maximum</p>
          </div>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={isRefillHeartsDisabled}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 sm:px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg sm:rounded-xl shadow-md transition w-full sm:w-auto sm:min-w-[120px] lg:min-w-[140px] flex-shrink-0"
        >
          {hearts === 5 ? (
            <span className="text-sm sm:text-base lg:text-lg">Full</span>
          ) : (
            <div className="flex items-center justify-center gap-x-2">
              <Image 
                src="/point.png" 
                alt="Points" 
                height={20} 
                width={20} 
                className="rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
              />
              <p className="text-white font-medium text-sm sm:text-base lg:text-lg">{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
    </ul>
  );
};