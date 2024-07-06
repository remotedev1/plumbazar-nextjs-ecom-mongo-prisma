"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const changeDeliveryStatus = async (values) => {
  const { value, rfqId } = values;
  const { user } = await auth();

  if (user.role !== "ADMIN") {
    return { error: "Please login as admin!" };
  }

  try {
    const updatedRfq = await db.rfq.update({
      where: {
        id: rfqId,
      },
      data: {
        status: value,
      },
    });

    return { success: "Rfq's updated successfully", rfq: updatedRfq };
  } catch (error) {
    console.error("Error updating rfq:", error);
    return { error: "Failed to update rfq. Please try again later." };
  }
};
