import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { user } = await auth();

    // Ensure the user is authenticated and is an ADMIN
    if (!user || user.role !== "SALES") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { data } = body;

    // Validate the necessary fields
    if (!data.details.draftId) {
      return new NextResponse("Draft invoice ID is required", { status: 400 });
    }

    if (!data?.details?.items || data.details.items.length === 0) {
      return new NextResponse("Order items are required", { status: 400 });
    }

    if (!data.receiver.customerId) {
      return new NextResponse("Customer ID is required", { status: 400 });
    }

    const modifiedCartItems = data.details.items.map((item) => ({
      msp: Number(item.msp),
      offerId: item.offerId,
      quantity: Number(item.quantity),
      productId: item.id,
      total:
        (Number(item.msp) + (Number(item.gst) * Number(item.msp)) / 100) *
        Number(item.quantity),
    }));

    // Create the order with items and address details
    const createdOrder = await db.order.create({
      data: {
        orderItems: {
          createMany: {
            data: modifiedCartItems,
          },
        },
        address: {
          set: {
            address: data.receiver.address,
            city: data.receiver.city,
            state: "Karnataka", // Change this if needed
            zip: data.receiver.zip,
            phone: data.receiver.phone,
          },
        },
        user: {
          connect: { id: data.receiver.customerId }, // Connect user by ID
        },
        total: data.details.totalAmount,
      },
    });

    // Update the rfq status
    await db.rfq.update({
      where: { id: data.details.rfqId },
      data: { status: "PROCESSED" },
    });
    // Update the draft invoice with the new order ID
    await db.draftInvoice.update({
      where: { id: data.details.draftId },
      data: { orderId: createdOrder.id, status: "COMMITTED" },
    });

    // Return the created order
    return NextResponse.json(createdOrder);
  } catch (error) {
    console.log("[ORDER_POST_ERROR]", error);

    // Handle specific errors like missing relations or invalid data
    if (error.code === "P2025") {
      return new NextResponse("Draft invoice not found", { status: 404 });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
