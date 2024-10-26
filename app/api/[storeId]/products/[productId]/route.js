import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { checkAuthorization } from "@/lib/helpers";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    // find and update store by id

    const product = await db.product.findUnique({
      where: {
        id: params.productId,
      },

      include: {
        // include the relations to get the full data of the product
        brand: true,
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { user } = await auth();

    // Check if the user is authorized
    if (!checkAuthorization(user, ["SUPERADMIN", "ADMIN"])) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();

    // Fetch current product from the database
    const currentProduct = await db.product.findUnique({
      where: {
        id: params.productId,
      },
    });

    if (!currentProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const updateData = {};

    // Only add fields that are present in formData
    if (formData.has("name")) updateData.name = formData.get("name");
    if (formData.has("mrp")) updateData.mrp = Number(formData.get("mrp"));
    if (formData.has("msp")) updateData.msp = Number(formData.get("msp"));
    if (formData.has("purchasedPrice"))
      updateData.purchasedPrice = Number(formData.get("purchasedPrice"));
    if (formData.has("gst")) updateData.gst = Number(formData.get("gst"));
    if (formData.has("brandId")) updateData.brandId = formData.get("brandId");
    if (formData.has("description"))
      updateData.description = formData.get("description");
    if (formData.has("categoryId"))
      updateData.categoryId = formData.get("categoryId");
    if (formData.has("isFeatured"))
      updateData.isFeatured = formData.get("isFeatured") === "true";
    if (formData.has("isArchived"))
      updateData.isArchived = formData.get("isArchived") === "true";

    // Handle images separately
    const images = formData.getAll("images");
    const newImages = formData.getAll("newImages");

    if (!updateData.mrp) {
      return new NextResponse("MRP is required", { status: 400 });
    }

    if (!updateData.msp) {
      return new NextResponse("MSP is required", { status: 400 });
    }

    // Determine which images to keep
    const imagesToKeep = [...images, ...newImages];

    // Update images in the database
    if (imagesToKeep.length) {
      updateData.images = imagesToKeep;
    }

    // Update the product
    const product = await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        ...updateData, // Use the constructed update data
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error(`[PRODUCT_PATCH] `, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { user } = await auth();

    // Check if the user is authorized
    if (!checkAuthorization(user, ["SUPERADMIN", "ADMIN"])) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = params;

    if (!storeId) {
      return new NextResponse("Store ID is Required", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Product ID is Required", { status: 400 });
    }

    const storeByUser = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId: user.id,
      },
    });

    if (!storeByUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // find and update store

    const product = await db.product.findUnique({
      where: {
        id: params.productId,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // Delete the product from the database
    await db.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(`[PRODUCT_DELETE] `, error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
