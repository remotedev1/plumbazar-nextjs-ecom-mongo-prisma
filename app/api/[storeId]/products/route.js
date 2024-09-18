import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { user } = await auth();
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const formData = await req.formData();

    const name = formData.get("name");
    const mrp = formData.get("mrp");
    const msp = formData.get("msp");
    const purchasedPrice = formData.get("purchasedPrice");
    const gst = formData.get("gst");
    const brandId = formData.get("brandId");
    const description = formData.get("description");
    const categoryId = formData.get("categoryId");
    const isFeatured = formData.get("isFeatured") === "true";
    const isArchived = formData.get("isArchived") === "true";

    const images = formData.getAll("newImages");

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!gst) {
      return new NextResponse("gst is required", { status: 400 });
    }

    if (!images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!mrp) {
      return new NextResponse("MRP is required", { status: 400 });
    }

    if (!msp) {
      return new NextResponse("MSP is required", { status: 400 });
    }

    if (!brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    // Upload new images to Cloudinary (if they are not already in the images array)
    const folderPath = "products";
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
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

    const product = await db.product.create({
      data: {
        postedBy: user.id,
        name,
        msp: Number(msp),
        mrp: Number(mrp),
        purchasedPrice: Number(purchasedPrice),
        isFeatured,
        isArchived,
        gst: Number(gst),
        brandId,
        description,
        categoryId,
        images: uploadedImages,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const { searchParams } = new URL(req.url);
    const brandId = searchParams.get("brandId") || undefined;

    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const products = await db.product.findMany({
      where: {
        storeId: params.storeId,
        brandId,
        categoryId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        brand: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
