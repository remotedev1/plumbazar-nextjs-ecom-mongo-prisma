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
    const images = formData.getAll("newImages");

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || images.length === 0) {
      return new NextResponse("Images are required", { status: 400 });
    }

    // Convert images to Base64 format
    const base64Images = await Promise.all(
      images.map(async (image) => {
        if (image instanceof File) {
          const arrayBuffer = await image.arrayBuffer();
          const base64String = Buffer.from(arrayBuffer).toString("base64");
          return `data:${image.type};base64,${base64String}`;
        } else {
          throw new Error("Invalid file format");
        }
      })
    );

    // Save brand with Base64-encoded images
    const brand = await db.brand.create({
      data: {
        postedBy: user.id,
        name,
        images: base64Images, // Store Base64 strings directly
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
