import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define which routes require admin access
const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
]);

// Define which routes require authentication
const isProtectedRoute = createRouteMatcher([
  "/learn(.*)",
  "/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Check if this is an admin route
  if (isAdminRoute(req)) {
    // If not signed in, redirect to sign-in
    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Check if user is admin
    const adminIds = process.env.CLERK_ADMIN_IDS?.split(", ") || [];
    const isAdmin = adminIds.includes(userId);

    // If not admin, redirect to regular app
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/learn", req.url));
    }
  }

  // Protect other routes that require authentication
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/(api|trpc)(.*)",
  ],
};