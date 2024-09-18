import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/db";
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
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
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

    const images = formData.getAll("images");
    const newImages = formData.getAll("newImages");

    if (!gst) {
      return new NextResponse("gst is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!brandId) {
      return new NextResponse("Brand Id is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

    if (!purchasedPrice) {
      return new NextResponse("purchased price is required", { status: 400 });
    }

    if (!mrp) {
      return new NextResponse("MRP is required", { status: 400 });
    }

    if (!msp) {
      return new NextResponse("MSP is required", { status: 400 });
    }

    if (!images) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    // Fetch current product from the database
    const currentProduct = await db.product.findUnique({
      where: {
        id: params.productId,
      },
    });

    if (!currentProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // Determine which images to delete
    const imagesToDelete = currentProduct.images.filter(
      (dbImage) => !images.includes(dbImage) // Images in DB but not in the new array of URLs
    );

    // Delete images from Cloudinary
    await Promise.all(
      imagesToDelete.map(async (image) => {
        const publicId = image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`products/${publicId}`);
      })
    );

    // Upload new images to Cloudinary (if they are provided)
    let uploadedImages = [];
    if (newImages && newImages.length > 0) {
      uploadedImages = await Promise.all(
        newImages.map(async (image) => {
          if (image instanceof File) {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const result = await cloudinary.uploader.upload(
              `data:${image.type};base64,${buffer.toString("base64")}`,
              { folder: "products" }
            );
            return result.secure_url;
          } else {
            throw new Error("Invalid file format");
          }
        })
      );
    }

    // Combine new uploaded images and the existing images that weren't deleted
    const finalImages = [...images, ...uploadedImages];

    // Update the product
    await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
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
        images: finalImages,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(`[PRODUCT_PATCH] `, error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { user } = await auth();
    if (!user) {
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

    // Delete images from Cloudinary
    await Promise.all(
      product.images.map(async (image) => {
        const publicId = image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`products/${publicId}`);
      })
    );

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
