import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { user } = await auth();
    if (!user) {
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
    if (formData.has("mrp")) updateData.mrp = Number(formData.get("mrp"));
    if (formData.has("msp")) updateData.msp = Number(formData.get("msp"));

    if (!updateData.mrp) {
      return new NextResponse("MRP is required", { status: 400 });
    }

    if (!updateData.msp) {
      return new NextResponse("MSP is required", { status: 400 });
    }

    // Update the product
    const product = await db.product.update({
      where: {
        id: params.productId,
      },
      data: updateData, // Use the constructed update data
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(`[PRODUCT_PATCH] `, error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
