"use server"

import { db } from "@/lib/db";

export const getStockCount = async (storeId) => {
  const stockCount = await db.product.count({
    where: {
      isArchived: false,
    },
  });

  return stockCount;
};
