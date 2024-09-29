import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
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

    // Delete images from Cloudinary
    await Promise.all(
      category.images.map(async (image) => {
        const publicId = image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`categories/${publicId}`);
      })
    );

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
    const images = formData.getAll("images");
    const newImages = formData.getAll("newImages");

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !newImages) {
      return new NextResponse("Images are required", { status: 400 });
    }

    // Fetch current images from the database
    const currentCategory = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    if (!currentCategory) {
      return new NextResponse("Category not found", { status: 404 });
    }

    // Find images to delete (present in DB but not in the images array from the form)
    const imagesToDelete = currentCategory.images.filter(
      (dbImage) => !images.includes(dbImage) // Images in DB but not in the new array of URLs
    );

    // Delete images from Cloudinary
    await Promise.all(
      imagesToDelete.map(async (image) => {
        const publicId = image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`brands/${publicId}`);
      })
    );

    const folderPath = "brands";

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
          return result.secure_url;
        } else {
          throw new Error("Invalid file format");
        }
      })
    );

    // Combine new uploaded images and the existing images that weren't deleted
    const finalImages = [...images, ...uploadedImages].flat();

    const category = await db.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        images: finalImages,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
