import { type NextRequest, NextResponse } from "next/server";
import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq, desc } from "drizzle-orm";

export const GET = async () => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db.query.units.findMany();

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const body = (await req.json()) as typeof units.$inferSelect;

  // Get the highest order number for this course
  const existingUnits = await db.query.units.findMany({
    where: eq(units.courseId, Number(body.courseId)),
    orderBy: [desc(units.order)],
  });

  // Calculate next order (highest + 1, or 1 if none exist)
  const nextOrder = existingUnits.length > 0 ? existingUnits[0].order + 1 : 1;

  const data = await db
    .insert(units)
    .values({
      title: body.title,
      description: body.description,
      courseId: Number(body.courseId),
      order: nextOrder,
    })
    .returning();

  return NextResponse.json(data[0]);
};