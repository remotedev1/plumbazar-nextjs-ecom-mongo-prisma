import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
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

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const action = formData.get("action");
    const images = formData.getAll("images");
    const newImages = formData.getAll("newImages");


    if (!images || !newImages) {
      return new NextResponse("Images are required", { status: 400 });
    }


    if (!params.storeId) {
      return new NextResponse("Store ID is Required", { status: 400 });
    }
    if (!params.billboardId) {
      return new NextResponse("Billboard ID is Required", { status: 400 });
    }
 // Fetch current images from the database
    const currentProduct = await db.product.findUnique({
      where: {
        id: params.productId,
      },
    });

    // Find images to delete (images present in DB but not in the new images list)
    const imagesToDelete = currentProduct.images.filter(
      (dbImage) => !images.some((image) => image === dbImage)
    );

    // Delete images from Cloudinary
    await Promise.all(
      imagesToDelete.map(async (image) => {
        const publicId = image.split("/").pop().split(".")[0];
        console.log(publicId);
        await cloudinary.uploader.destroy(`products/${publicId}`);
      })
    );

    // Upload images to Cloudinary path
    const folderPath = "testimonials";
    // Upload images to Cloudinary
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
    const billboard = await db.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        postedBy: user.id,
        title,
        description,
        action,
        images: uploadedImages.map((img) => img.url),
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log(`[STORE_PATCH] `, error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { user } = await auth();
    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { storeId } = params;

    if (!storeId) {
      return new NextResponse("Store ID is Required", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is Required", { status: 400 });
    }

    // const storeByUserId = await db.store.findFirst({
    //   where: {
    //     id: params.storeId,
    //     userId: user.id,
    //   },
    // });

    // if (!storeByUserId) {
    //   return new NextResponse("Unauthorized", { status: 403 });
    // }

    // find and update store

    const billboard = await db.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log(`[BILLBOARDS_DELETE] `, error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
