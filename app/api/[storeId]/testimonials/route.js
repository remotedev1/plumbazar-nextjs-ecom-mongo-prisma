import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req, { params }) {
  try {
    const { user } = await auth();

    const formData = await req.formData();

    const name = formData.get("name");
    const organization = formData.get("organization");
    const designation = formData.get("designation");
    const message = formData.get("message");
    const images = formData.getAll("newImages");

    //TODO
    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!message) {
      return new NextResponse("message is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    // Upload images to Cloudinary path
    const folderPath = "testimonials";
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

    const testimonial = await db.testimonial.create({
      data: {
        postedBy: user.id,
        name,
        message,
        organization,
        designation,
        images: uploadedImages.map((img) => img.url),
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.log("[TESTIMONIAL_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const testimonial = await db.testimonial.findMany();

    return NextResponse.json(testimonial);
  } catch (error) {
    console.log("[TESTIMONIAL_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
