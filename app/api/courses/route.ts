import { type NextRequest, NextResponse } from "next/server";
import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { writeFile } from "fs/promises";
import path from "path";

export const GET = async () => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  const data = await db.query.courses.findMany();

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) return new NextResponse("Unauthorized.", { status: 401 });

  try {
    const contentType = req.headers.get("content-type") || "";

    // Handle FormData (from our custom httpClient)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const title = formData.get("title") as string;
      const imageFile = formData.get("imageSrc") as File;

      if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
      }

      let imagePath: string | undefined;

      if (imageFile && imageFile instanceof File && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = `${Date.now()}-${imageFile.name}`;
        const filePath = path.join(process.cwd(), "public", fileName);

        await writeFile(filePath, buffer);
        imagePath = `/${fileName}`;
      }

      const data = await db
        .insert(courses)
        .values({
          title,
          ...(imagePath && { imageSrc: imagePath }),
        })
        .returning();

      return NextResponse.json(data[0]);
    }

    // Fallback: Handle JSON (shouldn't happen with our httpClient, but just in case)
    const body = await req.json();
    
    const data = await db
      .insert(courses)
      .values({
        title: body.title,
        ...(body.imageSrc && typeof body.imageSrc === "string" && { imageSrc: body.imageSrc }),
      })
      .returning();

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error creating course:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};