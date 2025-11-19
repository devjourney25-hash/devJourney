import { type NextRequest, NextResponse } from "next/server";
import db from "@/db/drizzle";
import { lessonModules } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq, desc } from "drizzle-orm";

export const GET = async () => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db.query.lessonModules.findMany({
    orderBy: (lessonModules, { asc }) => [asc(lessonModules.order)],
  });
  
  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const body = await req.json();

  // Get the highest order number for this course
  const existingModules = await db.query.lessonModules.findMany({
    where: eq(lessonModules.courseId, Number(body.courseId)),
    orderBy: [desc(lessonModules.order)],
  });

  // Calculate next order (highest + 1, or 1 if none exist)
  const nextOrder = existingModules.length > 0 ? existingModules[0].order + 1 : 1;

  const data = await db
    .insert(lessonModules)
    .values({
      courseId: Number(body.courseId),
      title: body.title,
      description: body.description,
      concepts: body.concepts,
      tip: body.tip,
      order: nextOrder,
    })
    .returning();

  return NextResponse.json(data[0]);
};