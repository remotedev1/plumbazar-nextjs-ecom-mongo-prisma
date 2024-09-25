import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { user } = await auth();

    // Check if the user is authenticated and has the right role
    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { orderId, data } = body; // 'data' is an array of product IDs

    // Validate orderId
    if (!orderId) {
      return new NextResponse("Order ID is required", { status: 400 });
    }

    // Fetch the order from the database
    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true }, // Fetch existing order items
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    // Fetch the products based on the product IDs in data array
    const products = await db.product.findMany({
      where: {
        id: { in: data }, // Fetch products matching the IDs in the 'data' array
      },
    });

    // Map through each product and update the purchasePrice of the corresponding orderItem
    const updatedItems = products.map((product) => {
      const existingOrderItem = order.orderItems.find(
        (orderItem) => orderItem.productId === product.id
      );

      if (existingOrderItem) {
        // Update purchasePrice for the existing item
        return db.orderItem.update({
          where: { id: existingOrderItem.id },
          data: { purchasePrice: product.purchasedPrice }, // Update with product's purchase price
        });
      }
    });

    // Execute all updates
    await Promise.all(updatedItems);

    // Update the order's delivery status and who cleared it
    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: {
        deliveryStatus: "PACKING",
        clearedBy: user.id,
      },
    });

    // Return the updated order
    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.log("[ORDER_PATCH]", error);

    // Handle specific database errors if needed (e.g., if the order does not exist)
    if (error.code === "P2025") {
      return new NextResponse("Order not found", { status: 404 });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
