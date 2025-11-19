"use client";

import { claimQuestHearts } from "@/actions/quest-progress";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  questId: number;
  heartsReward: number;
};

export const ClaimHeartButton = ({ questId, heartsReward }: Props) => {
  const [pending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      claimQuestHearts(questId)
        .then((data) => {
          if (data?.error === "Already claimed") {
            toast.error("You've already claimed this reward!");
            return;
          }
          toast.success(`You claimed ${heartsReward} ${heartsReward === 1 ? "heart" : "hearts"}! 💖`, {
            duration: 3000,
          });
        })
        .catch(() => toast.error("Something went wrong. Please try again."));
    });
  };

  return (
    <Button
      onClick={onClick}
      disabled={pending}
      variant="secondary"
      className="bg-rose-500 hover:bg-rose-600 text-white border-rose-600 border-b-4 active:border-b-2"
    >
      <Heart className="w-4 h-4 mr-2 fill-white" />
      Claim
    </Button>
  );
};