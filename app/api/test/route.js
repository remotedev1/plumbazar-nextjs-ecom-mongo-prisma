import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import productsList from "./products.json";

export async function GET(req, { params }) {
  try {
    const { user } = await auth();
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!Array.isArray(productsList)) {
      return new NextResponse("Invalid data format. Expected an array of products.", { status: 400 });
    }

    const createdProducts = [];

    for (const productData of productsList) {
      const {
        name,
        price,
        purchasedPrice,
        isFeatured,
        isArchived,
        brandId,
        categoryId,
        storeId,
        images
      } = productData;

      const product = await db.product.create({
        data: {
          name,
          price: Number(price),
          purchasedPrice: Number(purchasedPrice),
          isFeatured,
          isArchived,
          brandId,
          categoryId,
          storeId,
          images,
        },
      });

      createdProducts.push(product);
    }

    return NextResponse.json(createdProducts);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
