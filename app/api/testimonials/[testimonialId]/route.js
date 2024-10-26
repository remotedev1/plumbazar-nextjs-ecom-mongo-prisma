import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { checkAuthorization } from "@/lib/helpers";

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

    // Check if the user is authorized
    if (!checkAuthorization(user, ["SUPERADMIN"])) {
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

    await db.testimonial.delete({
      where: {
        id: params.testimonialId,
      },
    });

    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.log("[TESTIMONIAL_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { user } = await auth();

    // Check if the user is authorized
    if (!checkAuthorization(user, ["SUPERADMIN"])) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.testimonialId) {
      return new NextResponse("Testimonial ID is required", { status: 400 });
    }

    const formData = await req.formData();

    const name = formData.get("name");
    const organization = formData.get("organization") || "";
    const designation = formData.get("designation") || "";
    const message = formData.get("message");
    const images = formData.getAll("images");
    const newImages = formData.getAll("newImages");

    // Validations
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!message)
      return new NextResponse("Message is required", { status: 400 });

    const currentTestimonial = await db.testimonial.findUnique({
      where: { id: params.testimonialId },
    });

    if (!currentTestimonial) {
      return new NextResponse("Testimonial not found", { status: 404 });
    }

    // Upload new images as base64 strings
    const uploadedImages = await Promise.all(
      newImages.map(async (image) => {
        if (!(image instanceof File)) {
          throw new Error("Invalid file format");
        }
        const arrayBuffer = await image.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString("base64");
        return `data:${image.type};base64,${base64String}`;
      })
    );

    // Combine existing and newly uploaded images
    const finalImages = [...images, ...uploadedImages];

    // Update testimonial in the database
    const updatedTestimonial = await db.testimonial.update({
      where: { id: params.testimonialId },
      data: {
        name,
        message,
        organization,
        designation,
        images: finalImages,
      },
    });

    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    console.error("[TESTIMONIAL_PATCH]", error);

    if (error.message === "Invalid file format") {
      return new NextResponse("Invalid file format", { status: 400 });
    }

    return new NextResponse("Internal error", { status: 500 });
  }
}
