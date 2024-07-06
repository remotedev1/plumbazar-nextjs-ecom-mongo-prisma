"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const addWishlist = async (values) => {
  const { user } = await auth();

  if (!user) {
    return { error: "Please sign in!" };
  }

  try {
    // You need to ensure you're passing the correct data to create the order
    const createdWishlist = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        wishlists: { connect: { id: values } },
      },
    });

    return { success: "Product added to wishlist successfully" };
  } catch (error) {
    console.error("Error creating order:", error);
    return { error: "Failed to create wishlist. Please try again later." };
  }
};

export const getWishlist = async () => {
  const { user } = await auth();

  if (!user) {
    return { error: "Please sign in!" };
  }

  try {
    // You need to ensure you're passing the correct data to create the order
    const wishlist = await db.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        wishlists: true,
      },
    });

    return { success: "Wishlist successfully fetched", wishlist: wishlist.wishlists };
  } catch (error) {
    console.error("Error creating order:", error);
    return { error: "Failed to fetch wishlist. Please try again later." };
  }
};
