import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req, { params }) {
  try {
    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const brand = await db.brand.findUnique({
      where: {
        id: params.brandId,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { user } = await auth();

    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const brand = await db.brand.findUnique({
      where: {
        id: params.brandId,
      },
    });

    if (!brand) {
      return new NextResponse("brand not found", { status: 404 });
    }

    await db.brand.delete({
      where: {
        id: params.brandId,
      },
    });

    return NextResponse.json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.log("[BRAND_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { user } = await auth();

    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const images = formData.getAll("images");
    const newImages = formData.getAll("newImages");

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !newImages) {
      return new NextResponse("Images are required", { status: 400 });
    }

    // Fetch the current brand from the database
    const currentBrand = await db.brand.findUnique({
      where: { id: params.brandId },
    });

    if (!currentBrand) {
      return new NextResponse("Brand not found", { status: 404 });
    }

    // Convert new images to Base64 format
    const uploadedImages = await Promise.all(
      newImages.map(async (image) => {
        if (image instanceof File) {
          const arrayBuffer = await image.arrayBuffer();
          const base64String = Buffer.from(arrayBuffer).toString("base64");
          return `data:${image.type};base64,${base64String}`;
        } else {
          throw new Error("Invalid file format");
        }
      })
    );

    // Combine existing images (not deleted) with new uploaded images
    const finalImages = [...images, ...uploadedImages];

    // Update the brand with the new data
    const updatedBrand = await db.brand.update({
      where: { id: params.brandId },
      data: {
        name,
        images: finalImages, // Store updated images in Base64
      },
    });

    return NextResponse.json(updatedBrand);
  } catch (error) {
    console.log("[BRAND_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
