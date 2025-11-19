import { type NextRequest, NextResponse } from "next/server";
import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { writeFile } from "fs/promises";
import path from "path";

export const GET = async (
  req: NextRequest,
  { params }: { params: { courseId: string } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, parseInt(params.courseId)),
  });

  if (!data) {
    return new NextResponse("Course not found.", { status: 404 });
  }

  return NextResponse.json(data);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { courseId: string } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const imageFile = formData.get("imageSrc") as File | null;

  // Get existing course data
  const existingCourse = await db.query.courses.findFirst({
    where: eq(courses.id, parseInt(params.courseId)),
  });

  if (!existingCourse) {
    return new NextResponse("Course not found.", { status: 404 });
  }

  let imagePath = existingCourse.imageSrc;

  // Handle file upload if new file is provided
  if (imageFile && imageFile instanceof File && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${imageFile.name}`;
    const filePath = path.join(process.cwd(), "public", fileName);

    await writeFile(filePath, buffer);
    imagePath = `/${fileName}`;
  }

  const data = await db
    .update(courses)
    .set({
      title,
      imageSrc: imagePath,
    })
    .where(eq(courses.id, parseInt(params.courseId)))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { courseId: string } }
) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db
    .delete(courses)
    .where(eq(courses.id, parseInt(params.courseId)))
    .returning();

  if (data.length === 0) {
    return new NextResponse("Course not found.", { status: 404 });
  }

  return NextResponse.json({ success: true });
};