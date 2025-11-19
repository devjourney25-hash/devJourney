import { type NextRequest, NextResponse } from "next/server";
import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq, desc } from "drizzle-orm";

export const GET = async () => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db.query.lessons.findMany();

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const body = await req.json();

  // Get the highest order number for this unit
  const existingLessons = await db.query.lessons.findMany({
    where: eq(lessons.unitId, Number(body.unitId)),
    orderBy: [desc(lessons.order)],
  });

  // Calculate next order (highest + 1, or 1 if none exist)
  const nextOrder = existingLessons.length > 0 ? existingLessons[0].order + 1 : 1;

  const data = await db
    .insert(lessons)
    .values({
      title: body.title,
      unitId: Number(body.unitId),
      order: nextOrder,
    })
    .returning();

  return NextResponse.json(data[0]);
};