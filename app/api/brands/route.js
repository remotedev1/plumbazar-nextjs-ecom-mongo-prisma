import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req, { params }) {
  try {
    const { user } = await auth();

    const formData = await req.formData();

    const name = formData.get("name");
    const images = formData.getAll("newImages");

    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const folderPath = "brands";

    // Upload images to Cloudinary
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

    const brand = await db.brand.create({
      data: {
        postedBy: user.id,
        name,
        images: uploadedImages.map((img) => img.url),
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRANDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const brands = await db.brand.findMany();

    return NextResponse.json(brands);
  } catch (error) {
    console.log("[BRANDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
