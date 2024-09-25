import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { user } = await auth();

    // Ensure the user is authenticated and is an ADMIN
    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { draftId, data } = body;

    // Validate the necessary fields
    if (!draftId) {
      return new NextResponse("Draft invoice ID is required", { status: 400 });
    }

    if (!data?.details?.items || data.details.items.length === 0) {
      return new NextResponse("Order items are required", { status: 400 });
    }

    if (!data.receiver.customerId) {
      return new NextResponse("Customer ID is required", { status: 400 });
    }

    // Create the order with items and address details
    const createdOrder = await db.order.create({
      data: {
        orderItems: {
          createMany: {
            data: data.details.items.map((item) => {
              const { name, purchasePrice, ...rest } = item; // Destructure to remove 'name' and 'purchasePrice'
              return { ...rest }; // Return the remaining fields (e.g., productId, quantity, etc.)
            }),
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

    // Update the draft invoice with the new order ID
    await db.draftInvoice.update({
      where: { id: draftId },
      data: { orderId: createdOrder.id },
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