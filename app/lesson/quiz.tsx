"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState, useTransition } from "react";
import { Header } from "./header";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { reduceHearts } from "@/actions/user-progress";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useWindowSize, useMount } from "react-use";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";
import { Trophy } from "lucide-react";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: typeof challengeOptions.$inferSelect[];
  })[];
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
}: Props) => {
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const { width, height } = useWindowSize();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  
  // Challenges come pre-randomized from server - NO CLIENT-SIDE RANDOMIZATION
  const [challenges] = useState(initialLessonChallenges);
  
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    const correctOption = options.find((option) => option.correct);
    if (!correctOption) {
      return;
    }

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);
          })
          .catch(() => {
            console.error("Something went wrong, please try again");
          });
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }
            setStatus("wrong");
            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => {
            console.error("Something went wrong, please try again");
          });
      });
    }
  };

  // Completion Screen
  if (!challenge) {
    return (
      <>
        <Confetti
          width={width}
          height={height}
          recycle={false}
          tweenDuration={10000}
          numberOfPieces={500}
          colors={['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899']}
        />
        <div className="flex flex-col gap-y-6 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full px-6 animate-in fade-in zoom-in duration-700">
          {/* Trophy Icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-yellow-600 to-orange-600 p-6 rounded-full border-4 border-yellow-500/50 shadow-2xl shadow-yellow-500/30">
              <Trophy className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-3">
            <h1 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
              Outstanding Work!
            </h1>
            <p className="text-lg lg:text-xl text-gray-300">
              You've completed the lesson
            </p>
          </div>

          {/* Results Cards */}
          <div className="flex items-center gap-x-4 w-full mt-4">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen pb-[120px]">
        <Header hearts={hearts} percentage={percentage} />
        
        <div className="flex-1 flex items-center justify-center mt-0 sm:mt-12 w-full px-4 sm:px-6">
          <div className="w-full max-w-[600px] flex flex-col gap-y-6 sm:gap-y-8 lg:gap-y-10">
            {/* Question Title */}
            <div className="relative">
              <h1 className="text-base sm:text-xl lg:text-2xl text-center font-bold text-white drop-shadow-lg leading-tight px-2">
                {challenge.question}
              </h1>
            </div>

            {/* Challenge Content */}
            <div className="w-full">
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>

        <Footer
          disabled={pending || !selectedOption}
          status={status}
          onCheck={onContinue}
        />
      </div>
    </>
  );
};