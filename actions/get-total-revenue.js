"use server";
import { db } from "@/lib/db";

export const getTotalRevenue = async (storeId) => {
  const paidOrders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.total;
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
