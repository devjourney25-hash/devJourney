"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

export const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartsModal();
  
  useEffect(() => setIsClient(true), []);

  const handleGoToShop = () => {
    close();
    router.push("/shop");
  };

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image 
              src="/sad.png" 
              alt="Sad mascot character" 
              width={80} 
              height={80}
              priority
            />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            You Ran Out of Hearts!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Purchase more hearts in the shop to continue learning.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={handleGoToShop}
            >
              Go to Shop
            </Button>
            <Button
              variant="primaryOutline"
              className="w-full"
              size="lg"
              onClick={close}
            >
              No Thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};