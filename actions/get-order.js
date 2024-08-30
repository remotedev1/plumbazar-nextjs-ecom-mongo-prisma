"use server";
import { db } from "@/lib/db";
export const getOrder = async (id) => {
  const order = await db.order.findUnique({
    where: {
      id,
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: {
              category: true,
              brand: true,
            },
          },
        },
      },
    },
  });
  // return order
  return order;
};
