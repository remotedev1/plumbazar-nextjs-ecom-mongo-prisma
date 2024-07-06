"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { shippingAddressSchema } from "@/schemas";

export const postAddress = async (values) => {
  const validatedFields = shippingAddressSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { user } = await auth();

  if (!user) {
    return { error: "Please sign in!" };
  }
  try {
    // Update the address object with the new address information
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        address: {
          name: validatedFields.data.name,
          address: validatedFields.data.address,
          city: validatedFields.data.city,
          state: validatedFields.data.state,
          zip: validatedFields.data.zip,
          phone: validatedFields.data.phone,
        },
      },
    });
    return { success: "Address updated successfully" };
  } catch (error) {
    console.error("Error updating user address:", error);
    return { error: "Failed to update user address. Please try again later." };
  }
};
