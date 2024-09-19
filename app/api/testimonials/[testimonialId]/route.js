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

    
    const testimonial = await db.testimonial.findUnique({
      where: {
        id: params.testimonialId,
      },
    });

    if (!testimonial) {
      return new NextResponse("testimonial not found", { status: 404 });
    }

    // Delete images from Cloudinary
    await Promise.all(
      testimonial.images.map(async (image) => {
        const publicId = image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`billboards/${publicId}`);
      })
    );


     await db.testimonial.delete({
      where: {
        id: params.testimonialId,
      },
    });

    return NextResponse.json({message: "Testimonial deleted successfully"});
  } catch (error) {
    console.log("[TESTIMONIAL_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { user } = await auth();
    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.testimonialId) {
      return new NextResponse("testimonial id is required", { status: 400 });
    }

    const formData = await req.formData();

    const name = formData.get("name");
    const organization = formData.get("organization");
    const designation = formData.get("designation");
    const message = formData.get("message");
    const images = formData.getAll("images");
    const newImages = formData.getAll("newImages");

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!message) {
      return new NextResponse("message is required", { status: 400 });
    }

    const currentTestimonial = await db.testimonial.findUnique({
      where: {
        id: params.testimonialId,
      },
    });

    if (!currentTestimonial) {
      return new NextResponse("Testimonial not found", { status: 404 });
    }

    // Find images to delete (present in DB but not in the images array from the form)
    const imagesToDelete = currentTestimonial.images.filter(
      (dbImage) => !images.includes(dbImage) // Images in DB but not in the new array of URLs
    );

    // Delete images from Cloudinary
    await Promise.all(
      imagesToDelete.map(async (image) => {
        const publicId = image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`testimonials/${publicId}`);
      })
    );

    // Upload images to Cloudinary path
    // Upload new images to Cloudinary
    const uploadedImages = await Promise.all(
      newImages.map(async (image) => {
        if (image instanceof File) {
          const arrayBuffer = await image.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const result = await cloudinary.uploader.upload(
            `data:${image.type};base64,${buffer.toString("base64")}`,
            { folder: "testimonials" }
          );
          return result.secure_url;
        } else {
          throw new Error("Invalid file format");
        }
      })
    );
    // Combine new uploaded images and the existing images that weren't deleted
    const finalImages = [...images, ...uploadedImages];

    const testimonial = await db.testimonial.update({
      where: {
        id: params.testimonialId,
      },
      data: {
        name,
        message,
        organization,
        designation,
        images: finalImages,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.log("[TESTIMONIAL_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
