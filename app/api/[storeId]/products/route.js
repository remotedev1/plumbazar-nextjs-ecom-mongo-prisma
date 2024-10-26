import { auth } from "@/auth";
import { db } from "@/lib/db";
import { generateSlug } from "@/lib/helpers";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { user } = await auth();
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const formData = await req.formData();

    // Extract and validate form fields
    const name = formData.get("name");
    const mrp = formData.get("mrp");
    const msp = formData.get("msp");
    const purchasedPrice = formData.get("purchasedPrice") || 0; // Default to 0 if not provided
    const gst = formData.get("gst");
    const brandId = formData.get("brandId");
    const description = formData.get("description");
    const categoryId = formData.get("categoryId");
    const isFeatured = formData.get("isFeatured") === "true";
    const isArchived = formData.get("isArchived") === "true";
    const images = formData.getAll("newImages");

    // Validate required fields
    const validationErrors = [];
    if (!name) validationErrors.push("Name is required");
    if (!gst) validationErrors.push("GST is required");
    if (!mrp) validationErrors.push("MRP is required");
    if (!msp) validationErrors.push("MSP is required");
    if (!brandId) validationErrors.push("Brand ID is required");
    if (!categoryId) validationErrors.push("Category ID is required");
    if (!images.length) validationErrors.push("Images are required");

    if (validationErrors.length) {
      return new NextResponse(validationErrors.join(", "), { status: 400 });
    }

    // Convert images to Base64 strings
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        if (!(image instanceof File)) {
          throw new Error("Invalid file format");
        }
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64String = buffer.toString("base64");
        return `data:${image.type};base64,${base64String}`;
      })
    );

    // Create product in the database
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
        slug: generateSlug(name), // Assuming you have a slug generator function
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
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
