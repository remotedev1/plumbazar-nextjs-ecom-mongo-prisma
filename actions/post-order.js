"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { SendAdminOrderNotification } from "@/lib/mailService";

// Function to calculate the shipping cost based on the total
function calculateShippingCost(total) {
  if (total < 5000) {
    return 200;
  } else if (total >= 5000 && total < 10000) {
    return 500;
  } else {
    return 1000;
  }
}

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

    // Calculate total
    const total = cartItems?.reduce(
      (total, item) =>
        total +
        (Number(item.msp) + (Number(item.gst) * Number(item.msp)) / 100) *
          Number(item.quantity),
      0
    );

    // Calculate shipping cost
    const shippingCost = calculateShippingCost(total);

    const modifiedCartItems = cartItems.map((item) => ({
      msp: Number(item.msp),
      offerId: item.offerId,
      quantity: Number(item.quantity),
      productId: item.productId,
      total:
        (Number(item.msp) + (Number(item.gst) * Number(item.msp)) / 100) *
        Number(item.quantity),
    }));

    // You need to ensure you're passing the correct data to create the order
    const createdOrder = await db.order.create({
      data: {
        orderItems: { createMany: { data: modifiedCartItems } }, // Create the order items
        address,
        user: { connect: { id: user.id } },
        total,
        shippingCost,
      },
    });

    //TODO
    // await SendAdminOrderNotification("enquiry@plumbazar.com", createdOrder);

    return { success: "Order created successfully", order: createdOrder };
  } catch (error) {
    console.error("Error creating order:", error);
    return { error: "Failed to create order. Please try again later." };
  }
};
