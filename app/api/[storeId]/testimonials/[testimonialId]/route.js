import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { auth } from "@/auth";

export async function GET(req, { params }) {
  try {
    if (!params.testimonialId) {
      return new NextResponse("testimonial id is required", { status: 400 });
    }

    const testimonial = await db.testimonial.findUnique({
      where: {
        id: params.testimonialId,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.log("[TESTIMONIAL_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { user } = await auth();

    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.testimonialId) {
      return new NextResponse("testimonial id is required", { status: 400 });
    }

    const testimonial = await db.testimonial.delete({
      where: {
        id: params.testimonialId,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.log("[TESTIMONIAL_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { user } = await auth();
    const formData = await req.formData();
    const name = formData.get("name");
    const organization = formData.get("organization");
    const designation = formData.get("designation");
    const message = formData.get("message");
    const newImages = formData.getAll("newImages");
    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.testimonialId) {
      return new NextResponse("testimonial id is required", { status: 400 });
    }
    // Upload images to Cloudinary path
    const folderPath = "testimonials";
    // Upload new images to Cloudinary
    const uploadedImages = await Promise.all(
      newImages.map(async (image) => {
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

    const testimonial = await db.testimonial.update({
      where: {
        id: params.testimonialId,
      },
      data: {
        name,
        message,
        organization,
        designation,
        images: uploadedImages.map((img) => img.url),
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.log("[TESTIMONIAL_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
