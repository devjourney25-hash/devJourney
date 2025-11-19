import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignUpButton, SignInButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getIsAdmin } from "@/lib/admin";

export default async function Home() {
  // Check if user is authenticated
  const { userId } = await auth();
  
  // If user is signed in, redirect them appropriately
  if (userId) {
    const isAdmin = await getIsAdmin();
    
    if (isAdmin) {
      redirect("/admin");
    } else {
      redirect("/learn");
    }
  }

  // Only show marketing page to non-authenticated users
  return (
    <div className="max-w-[980px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <img src="/LOGO.png" alt="logo" className="rounded-md shadow-lg" />
      </div>
      <div className="flex flex-col items-center gap-y-8 bg-glass-dark bg-opacity-50 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <h1 className="text-xl lg:text-3xl font-bold text-white max-w-[400px] text-center">
          Learn, Practice, and Master new programming languages with devJourney
        </h1>
        <div className="flex flex-col items-center gap-y-3 w-full max-w-[330px]">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton 
                mode="modal"
                forceRedirectUrl="/learn"
              >
                <Button size="lg" variant="hologram" className="w-full">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton 
                mode="modal"
                forceRedirectUrl="/learn"
              >
                <Button size="lg" variant="sidebar" className="w-full">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button
                size="lg"
                variant="night"
                className="w-full"
                asChild
              >
                <Link href="/learn">
                  Continue Learning
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}