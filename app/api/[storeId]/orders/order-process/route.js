import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Phone } from "lucide-react";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { user } = await auth();

    const body = await req.json();

    const { draftId, data } = body;
    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!draftId) {
      return new NextResponse("draft invoice id is required", { status: 400 });
    }

    const createdOrder = await db.order.create({
      data: {
        orderItems: {
          createMany: {
            data: data.details.items.map((item) => {
              const { name, id, purchasePrice, ...rest } = item; // Destructure and remove 'name' and 'id'
              return { ...rest, productId: id }; // Add 'productId' as 'id'
            }),
          },
        },
        address: {
          set: {
            address: data.receiver.address,
            city: data.receiver.city,
            state: "karnataka",
            zip: data.receiver.zip,
            phone: data.receiver.phone,
          },
        },
        user: {
          connect: { id: data.receiver.customerId },
        },
        total: data.details.totalAmount,
      },
    });
    await db.draftInvoice.update({
      where: { id: draftId },
      data: { orderId: createdOrder.id },
    });

    return NextResponse.json(createdOrder);
  } catch (error) {
    console.log("[ORDER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
