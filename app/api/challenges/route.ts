import { type NextRequest, NextResponse } from "next/server";
import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq, desc } from "drizzle-orm";

export const GET = async () => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db.query.challenges.findMany();

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const body = await req.json();

  // Get the highest order number for this lesson
  const existingChallenges = await db.query.challenges.findMany({
    where: eq(challenges.lessonId, Number(body.lessonId)),
    orderBy: [desc(challenges.order)],
  });

  // Calculate next order (highest + 1, or 1 if none exist)
  const nextOrder = existingChallenges.length > 0 ? existingChallenges[0].order + 1 : 1;

  const data = await db
    .insert(challenges)
    .values({
      question: body.question,
      type: body.type,
      lessonId: Number(body.lessonId),
      order: nextOrder,
    })
    .returning();

  return NextResponse.json(data[0]);
};