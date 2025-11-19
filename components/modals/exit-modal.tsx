"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useExitModal } from "@/store/use-exit-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

export const ExitModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();
  
  useEffect(() => setIsClient(true), []);
  
  if (!isClient) {
    return null;
  }

  const handleEndSession = () => {
    close();
    router.push("/learn");
  };

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
            Wait, Don't Go!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You're about to leave the lesson. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button 
              variant="hologram" 
              className="w-full" 
              size="lg" 
              onClick={close}
            >
              Keep Learning
            </Button>
            <Button
              variant="dangerOutline"
              className="w-full"
              size="lg"
              onClick={handleEndSession}
            >
              End Session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};