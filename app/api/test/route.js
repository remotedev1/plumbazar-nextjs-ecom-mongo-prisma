import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  console.log(" iran")
  try {
    const { user } = await auth();
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // Update products that match the conditions
    const updatedProducts = await db.product.updateMany({
      where: {
        OR: [
          { categoryId: "66fc13d4be3bfeeffa32aa06" }, // Category condition
          { AND: [ { msp: 0 }, { mrp: 0 } ] } // MSP and MRP condition
        ],
      },
      data: {
        sellOnline: false
      }
    });

    return NextResponse.json({ 
      message: `${updatedProducts.count} products updated successfully.` 
    });
  } catch (error) {
    console.log("[PRODUCT_UPDATE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
