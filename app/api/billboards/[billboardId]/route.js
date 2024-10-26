import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const billboard = await db.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { user } = await auth();
    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is Required", { status: 400 });
    }

    const formData = await req.formData();

    const action = formData.get("action");
    const images = formData.getAll("images"); // URLs of existing images
    const newImages = formData.getAll("newImages"); // New images as File objects

    if (!images || !newImages) {
      return new NextResponse("Images are required", { status: 400 });
    }

    // Fetch current images from the database
    const currentBillboard = await db.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    if (!currentBillboard) {
      return new NextResponse("Billboard not found", { status: 404 });
    }

    // Upload new images to Cloudinary
    const uploadedImages = await Promise.all(
      newImages.map(async (image) => {
        if (image instanceof File) {
          const arrayBuffer = await image.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const result = await cloudinary.uploader.upload(
            `data:${image.type};base64,${buffer.toString("base64")}`,
            { folder: "billboards" }
          );
          return result.secure_url;
        } else {
          throw new Error("Invalid file format");
        }
      })
    );

    // Combine new uploaded images and the existing images that weren't deleted
    const finalImages = [...images, ...uploadedImages].flat();

    // Update the billboard with new data
    const updatedBillboard = await db.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        postedBy: user.id,
        action,
        images: finalImages, // Updated array with old and new images
      },
    });

    return NextResponse.json(updatedBillboard);
  } catch (error) {
    console.log(`[BILLBOARD_PATCH] `, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { user } = await auth();
    // if (user.role !== "SUPERADMIN") {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const billboard = await db.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    if (!billboard) {
      return new NextResponse("billboard not found", { status: 404 });
    }

    await db.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json({ message: "Billboard deleted successfully" });
  } catch (error) {
    console.log(`[BILLBOARDS_DELETE] `, error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
