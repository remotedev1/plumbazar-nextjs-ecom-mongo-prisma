"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { SendRfqNotification } from "@/lib/mailService";
import { RfqSchema } from "@/schemas";

export const postRfq = async (values) => {
  const validatedFields = RfqSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { user } = await auth();

  if (!user) return { error: "Please sign in!" };

  const { images, phone, notes } = validatedFields.data;
  try {
    // Create a new review
    const newRfq = await db.rfq.create({
      data: {
        userId: user.id,
        phone: Number(phone),
        notes: notes,
        images: images.map((image) => image.url),
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
