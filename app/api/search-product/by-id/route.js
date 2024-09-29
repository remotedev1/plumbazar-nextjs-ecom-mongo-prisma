import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { ids } = await req.json(); // Expect an array of product IDs in the request body

    if (!ids || !Array.isArray(ids)) {
      return new NextResponse("Invalid product IDs", { status: 400 });
    }

    const products = await db.product.findMany({
      where: {
        id: {
          in: ids, 
        },
      },
      include: {
        offers: true
      }
    });

    if (!products || products.length === 0) {
      return new NextResponse("Products not found", { status: 404 });
    }

    return NextResponse.json(products); // Return the array of products
  } catch (error) {
    console.error("[PRODUCTS_GET_BY_IDS]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
