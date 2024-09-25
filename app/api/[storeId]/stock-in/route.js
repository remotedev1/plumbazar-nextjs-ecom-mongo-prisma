import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Prisma client
import { auth } from "@/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { notes, products } = body;
    const { user } = await auth();

    if (!user) {
      return new NextResponse("Please sign in", { status: 400 });
    }

    if (!products || products.length === 0) {
      return new NextResponse("Products are required", { status: 400 });
    }

    // Start a transaction to update product quantities and create stock-in records
    const result = await db.$transaction(async (prisma) => {
      // Create the stockIn record with products as JSON
      const stockIn = await prisma.stockIn.create({
        data: {
          notes: notes || "",
          inBy: user.id,
          products: JSON.stringify(products),
        },
      });

      // Update product stock quantities
      await Promise.all(
        products.map((product) =>
          prisma.product.update({
            where: { id: product.productId },
            data: {
              stock: {
                increment: product.quantity, // Increment the stock quantity
              },
              purchasedPrice: product.purchasePrice,
              msp: product.msp,
              mrp: product.mrp,
            },
          })
        )
      );

      return stockIn;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[STOCK_IN_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
