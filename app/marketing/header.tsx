"use client";

import { ClerkLoading, ClerkLoaded, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="h-20 w-full bg-glass-dark bg-opacity-50 backdrop-blur-md border-b border-gray-700 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="flex items-center gap-x-3">
          <img src="/LOGO.png" height={40} width={40} alt="logo" className="rounded-md" />
          <h1 className="text-2xl font-extrabold text-white tracking-wide">devJourney</h1>
        </div>

        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" variant="sidebar" >
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};