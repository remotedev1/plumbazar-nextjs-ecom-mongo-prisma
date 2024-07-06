"use server";

import { db } from "@/lib/db";

export const getSalesCount = async (storeId) => {
  const salesCount = await db.order.count({
    where: {
      isPaid: true,
    },
  });

  return salesCount;
};
