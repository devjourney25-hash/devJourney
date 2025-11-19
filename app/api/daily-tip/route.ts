// app/api/daily-tip/route.ts
import { NextResponse } from "next/server";
import { eq, count } from "drizzle-orm";

// This function generates a deterministic "random" offset based on the current date
// This ensures the same tip is shown for the entire day
function getDailyOffset(totalTips: number): number {
  const today = new Date();
  // Create a date string like "2025-10-12"
  const dateString = today.toISOString().split('T')[0];
  
  // Simple hash function to convert date string to a number
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use absolute value and modulo to get a valid index
  return Math.abs(hash) % totalTips;
}

export const GET = async () => {
  console.log("Daily Random Tip API hit!");
  
  try {
    const db = (await import("@/db/drizzle")).default;
    const { dailyTips } = await import("@/db/schema");
    
    console.log("Getting count of active tips...");
    
    // Get count of active tips
    const countResult = await db
      .select({ count: count() })
      .from(dailyTips)
      .where(eq(dailyTips.isActive, true));
    
    const totalTips = countResult[0]?.count || 0;
    console.log("Total active tips:", totalTips);
    
    if (totalTips === 0) {
      console.log("No active tips found");
      return NextResponse.json(
        { 
          error: "No tips available today",
          message: "No active tips in database",
          count: 0
        },
        { status: 404 }
      );
    }
    
    // Get deterministic offset based on current date
    // This ensures the same tip is shown for the entire day
    const dailyOffset = getDailyOffset(totalTips);
    console.log("Using daily offset:", dailyOffset, "for date:", new Date().toISOString().split('T')[0]);
    
    // Get tip at daily offset
    const tips = await db
      .select()
      .from(dailyTips)
      .where(eq(dailyTips.isActive, true))
      .limit(1)
      .offset(dailyOffset);
    
    if (tips.length === 0) {
      return NextResponse.json(
        { error: "No tip found" },
        { status: 404 }
      );
    }

    const dailyTip = tips[0];
    console.log("Selected daily tip:", dailyTip.id, "-", dailyTip.title);

    // Calculate seconds until midnight (in user's local timezone)
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const secondsUntilMidnight = Math.floor((tomorrow.getTime() - now.getTime()) / 1000);
    
    console.log("Cache will expire in", secondsUntilMidnight, "seconds (at midnight)");
    
    // Set cache headers to expire at midnight
    const headers = {
      'Cache-Control': `public, max-age=${secondsUntilMidnight}, s-maxage=${secondsUntilMidnight}, must-revalidate`,
      'Content-Type': 'application/json',
      'Expires': tomorrow.toUTCString(),
    };

    return NextResponse.json(dailyTip, { headers });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorStack = error instanceof Error ? error.stack : 'No stack trace available';
    
    console.error("ERROR in Daily Tip API:", errorMessage);
    console.error("STACK:", errorStack);
    
    return NextResponse.json({ 
      error: errorMessage,
      details: "Check server logs for more information",
      timestamp: new Date().toISOString(),
      stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
    }, { status: 500 });
  }
};