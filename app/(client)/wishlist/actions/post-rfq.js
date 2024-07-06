"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { SendRfqNotification } from "@/lib/mailService";
import { RfqSchema } from "@/schemas";

export const postReview = async (values) => {
  const validatedFields = RfqSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { user } = await auth();

  if (!user) return { error: "Please sign in!" };

  const { images, phoneNumber, notes } = validatedFields.data;

  try {
    // Create a new review
    const newRfq = await db.rfq.create({
      data: {
        userId: user.id,
        phoneNumber: phoneNumber,
        notes: notes,
        images: images,
      },
    });

    //send email update to admin
    await SendRfqNotification(
      //TODO
      "enquiry@plumbazar.com"
    );

    return {
      success: `RFQ submitted successfully!`,
    };
  } catch (error) {
    console.error("Error posting RFQ:", error);
    return null;
  }
};
