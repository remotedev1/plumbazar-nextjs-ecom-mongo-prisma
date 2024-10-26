import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req, { params }) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { user } = await auth();
    if (user.role !== "ADMIN" || user.role !== "SUPERADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    if (!category) {
      return new NextResponse("category not found", { status: 404 });
    }

    await db.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { user } = await auth();
    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const images = formData.getAll("images"); // Existing images (URLs or Base64)
    const newImages = formData.getAll("newImages"); // New images to be uploaded

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !newImages) {
      return new NextResponse("Images are required", { status: 400 });
    }

    // Fetch current category from the database
    const currentCategory = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    if (!currentCategory) {
      return new NextResponse("Category not found", { status: 404 });
    }

    // Convert new images to Base64 strings
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

    // Combine new Base64 images with existing images that weren't deleted
    const finalImages = [...images, ...uploadedImages];

    // Update the category in the database
    const category = await db.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        images: finalImages, // Store Base64 strings directly
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
