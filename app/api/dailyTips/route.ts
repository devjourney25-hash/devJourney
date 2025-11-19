import { type NextRequest, NextResponse } from "next/server";
import db from "@/db/drizzle";
import { dailyTips } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";

export const GET = async () => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db.query.dailyTips.findMany();

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const body = (await req.json()) as typeof dailyTips.$inferSelect;

  const data = await db
    .insert(dailyTips)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};

export const PUT = async (req: NextRequest) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const body = (await req.json()) as typeof dailyTips.$inferSelect;

  if (!body.id) {
    return new NextResponse("ID is required", { status: 400 });
  }

  const data = await db
    .update(dailyTips)
    .set({
      ...body,
      updatedAt: new Date(),
    })
    .where(eq(dailyTips.id, body.id))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (req: NextRequest) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new NextResponse("ID is required", { status: 400 });
  }

  await db.delete(dailyTips).where(eq(dailyTips.id, parseInt(id)));

  return NextResponse.json({ success: true });
};