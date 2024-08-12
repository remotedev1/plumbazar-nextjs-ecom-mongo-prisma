import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";

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

    const brand = await db.brand.delete({
      where: {
        id: params.brandId,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { user } = await auth();

    const formData = await req.formData();
    const name = formData.get("name");
    const images = formData.getAll("images");
    const newImages = formData.getAll("newImages");

    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!images || !newImages) {
      return new NextResponse("Images are required", { status: 400 });
    }
    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

      // Upload new images to Cloudinary
      const uploadedImages = await Promise.all(
        newImages.map(async (image) => {
          if (image instanceof File) {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const result = await cloudinary.uploader.upload(
              `data:${image.type};base64,${buffer.toString("base64")}`
            );
            return { url: result.secure_url };
          } else {
            throw new Error("Invalid file format");
          }
        })
      );

    const brand = await db.brand.update({
      where: {
        id: params.brandId,
      },
      data: {
        name,
        images: uploadedImages.map((img) => img.url),

      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
