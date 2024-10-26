import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { user } = await auth();

    // Authorization check
    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();

    const name = formData.get("name");
    const images = formData.getAll("newImages");

    // Validations
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    // Convert images to base64
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        if (!(image instanceof File)) {
          throw new Error("Invalid file format");
        }
        const arrayBuffer = await image.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString("base64");
        return `data:${image.type};base64,${base64String}`;
      })
    );

    // Store data in the database
    const clientele = await db.clientele.create({
      data: {
        postedBy: user.id,
        name,
        images: uploadedImages,
      },
    });

    return NextResponse.json(clientele);
  } catch (error) {
    console.error("[CLIENTELE_POST]", error);

    if (error.message === "Invalid file format") {
      return new NextResponse("Invalid file format", { status: 400 });
    }

    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const clienteles = await db.clientele.findMany();

    return NextResponse.json(clienteles);
  } catch (error) {
    console.log("[CLIENTELE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
