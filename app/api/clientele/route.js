import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req, { params }) {
  try {
    const { user } = await auth();
    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();

    const name = formData.get("name");
    const images = formData.getAll("newImages");

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images) {
      return new NextResponse("Images are required", { status: 400 });
    }

    // Upload images to Cloudinary
    const folderPath = "clientele";

    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        if (image instanceof File) {
          const arrayBuffer = await image.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const result = await cloudinary.uploader.upload(
            `data:${image.type};base64,${buffer.toString("base64")}`,
            { folder: folderPath }
          );
          return { url: result.secure_url };
        } else {
          throw new Error("Invalid file format");
        }
      })
    );

    const clienteles = await db.clientele.create({
      data: {
        postedBy: user.id,
        name,
        images: uploadedImages.map((img) => img.url),
      },
    });

    return NextResponse.json(clienteles);
  } catch (error) {
    console.log("[CLIENTELE_POST]", error);
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
