import { type NextRequest, NextResponse } from "next/server";
import db from "@/db/drizzle";
import { unitDetails } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq, desc } from "drizzle-orm";

export const GET = async () => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db.query.unitDetails.findMany();
  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const body = await req.json();

  // Get the highest order number for this lesson module
  const existingDetails = await db.query.unitDetails.findMany({
    where: eq(unitDetails.lessonModuleId, Number(body.lessonModuleId)),
    orderBy: [desc(unitDetails.order)],
  });

  // Calculate next order (highest + 1, or 1 if none exist)
  const nextOrder = existingDetails.length > 0 ? existingDetails[0].order + 1 : 1;

  const data = await db
    .insert(unitDetails)
    .values({
      lessonModuleId: Number(body.lessonModuleId),
      title: body.title,
      content: body.content,
      sampleCode: body.sampleCode,
      codeExplanation: body.codeExplanation,
      keyPoints: body.keyPoints,
      order: nextOrder,
    })
    .returning();

  return NextResponse.json(data[0]);
};