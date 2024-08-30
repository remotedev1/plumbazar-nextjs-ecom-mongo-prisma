"use server";

import { db } from "@/lib/db";


export const getPendingAmount = async (storeId) => {
  const unpaidOrders = await db.order.findMany({
    where: {
      isPaid: false,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const result = unpaidOrders.reduce(
    (accumulatedResult, order) => {
      const orderTotal = order.orderItems.reduce((orderSum, item) => {
        return orderSum + item.product.price;
      }, 0);

      return {
        numberOfUnpaidOrders: accumulatedResult.numberOfUnpaidOrders + 1,
        totalUnpaidAmount: accumulatedResult.totalUnpaidAmount + orderTotal,
      };
    },
    { numberOfUnpaidOrders: 0, totalUnpaidAmount: 0 },
  );

  return result;
};
