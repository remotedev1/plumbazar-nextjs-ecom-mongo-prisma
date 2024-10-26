import { auth } from "@/auth";
import { db } from "@/lib/db";
import { checkAuthorization } from "@/lib/helpers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user } = await auth();

    // Check if the user is authorized
    if (!checkAuthorization(user, ["SUPERADMIN"])) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();

    const name = formData.get("name");
    const organization = formData.get("organization") || "";
    const designation = formData.get("designation") || "";
    const message = formData.get("message");
    const images = formData.getAll("newImages");

    // Validate required fields
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!message)
      return new NextResponse("Message is required", { status: 400 });

    // Convert images to base64 strings
    const base64Images = await Promise.all(
      images.map(async (image) => {
        if (!(image instanceof File)) {
          throw new Error("Invalid file format");
        }
        const arrayBuffer = await image.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString("base64");
        return `data:${image.type};base64,${base64String}`;
      })
    );

    // Save testimonial in the database
    const testimonial = await db.testimonial.create({
      data: {
        postedBy: user.id,
        name,
        organization,
        designation,
        message,
        images: base64Images, // Store base64-encoded images
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("[TESTIMONIAL_POST]", error);

    if (error.message === "Invalid file format") {
      return new NextResponse("Invalid file format", { status: 400 });
    }

    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const testimonials = await db.testimonial.findMany();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.log("[TESTIMONIAL_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
