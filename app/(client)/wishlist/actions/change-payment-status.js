"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const changePaymentStatus = async (values) => {
  const { value, orderId } = values;
  const { user } = await auth();

  if (user.role !== "ADMIN") {
    return { error: "Please login as admin!" };
  }

  try {
    const updatedOrder = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: value,
      },
    });

    return { success: "Order updated successfully", order: updatedOrder };
  } catch (error) {
    console.error("Error updating order:", error);
    return { error: "Failed to update order. Please try again later." };
  }
};
