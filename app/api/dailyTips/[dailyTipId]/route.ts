// app/api/dailyTips/[dailyTipId]/route.ts
import { type NextRequest, NextResponse } from "next/server";
import db from "@/db/drizzle";
import { dailyTips } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";

// GET single daily tip by ID
export const GET = async (
  req: NextRequest,
  { params }: { params: { dailyTipId: string } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const tip = await db.query.dailyTips.findFirst({
    where: eq(dailyTips.id, parseInt(params.dailyTipId)),
  });

  if (!tip) {
    return new NextResponse("Daily tip not found.", { status: 404 });
  }

  return NextResponse.json(tip);
};

// PUT update daily tip by ID
export const PUT = async (
  req: NextRequest,
  { params }: { params: { dailyTipId: string } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const body = (await req.json()) as typeof dailyTips.$inferSelect;

  const data = await db
    .update(dailyTips)
    .set({
      ...body,
      updatedAt: new Date(),
    })
    .where(eq(dailyTips.id, parseInt(params.dailyTipId)))
    .returning();

  if (data.length === 0) {
    return new NextResponse("Daily tip not found.", { status: 404 });
  }

  return NextResponse.json(data[0]);
};

// DELETE daily tip by ID
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { dailyTipId: string } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db
    .delete(dailyTips)
    .where(eq(dailyTips.id, parseInt(params.dailyTipId)))
    .returning();

  if (data.length === 0) {
    return new NextResponse("Daily tip not found.", { status: 404 });
  }

  return NextResponse.json({ success: true });
};