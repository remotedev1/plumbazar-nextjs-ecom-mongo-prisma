"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const postOrder = async (values) => {
  if (values.cartItems.length === 0) {
    return { error: "Please add items to cart" };
  }
  if (!values.address) {
    return { error: "Please add a shipping address" };
  }
  //todo get the product id from the cart and get the price from database IMP
  const { user } = await auth();

  if (!user) {
    return { error: "Please sign in!" };
  }

  try {
    // Here you need to extract relevant data from the values object
    const { cartItems, address } = values;
    const total = cartItems?.reduce((total, item) => {
      return total + Number(item.price) * Number(item.quantity);
    }, 0);

    // You need to ensure you're passing the correct data to create the order
    const createdOrder = await db.order.create({
      data: {
        orderItems: { createMany: { data: cartItems } }, // Create the order items
        address,
        user: { connect: { id: user.id } },
        total,
      },
    });

    return { success: "Order created successfully", order: createdOrder };
  } catch (error) {
    console.error("Error creating order:", error);
    return { error: "Failed to create order. Please try again later." };
  }
};
