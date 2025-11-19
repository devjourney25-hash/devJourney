import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import db from "@/db/drizzle";
import { unitDetails } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async (
  req: NextRequest,
  { params }: { params: { unitDetailId: string } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db.query.unitDetails.findFirst({
    where: eq(unitDetails.id, Number(params.unitDetailId)),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { unitDetailId: string } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const body = await req.json();

  // Remove createdAt from the update (it shouldn't be updated)
  const { id, createdAt, ...updateData } = body;

  const data = await db
    .update(unitDetails)
    .set(updateData)
    .where(eq(unitDetails.id, Number(params.unitDetailId)))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { unitDetailId: string } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db
    .delete(unitDetails)
    .where(eq(unitDetails.id, Number(params.unitDetailId)))
    .returning();

  return NextResponse.json(data[0]);
};