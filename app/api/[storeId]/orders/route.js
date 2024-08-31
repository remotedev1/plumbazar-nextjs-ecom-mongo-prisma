import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { user } = await auth();

    const body = await req.json();

    const {orderId} = body;

    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!orderId) {
      return new NextResponse("order id is required", { status: 400 });
    }

    const order = await db.order.update({
      where: { id: orderId },
      data: {
        deliveryStatus: "PACKING",
        clearedBy: user.id,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
