import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import db from "@/db/drizzle";
import { lessonModules } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async (
  req: NextRequest,
  { params }: { params: { lessonModuleId: string } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db.query.lessonModules.findFirst({
    where: eq(lessonModules.id, Number(params.lessonModuleId)),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { lessonModuleId: string } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const body = await req.json();

  const data = await db
    .update(lessonModules)
    .set({
      ...body,
    })
    .where(eq(lessonModules.id, Number(params.lessonModuleId)))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { lessonModuleId: string } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db
    .delete(lessonModules)
    .where(eq(lessonModules.id, Number(params.lessonModuleId)))
    .returning();

  return NextResponse.json(data[0]);
};