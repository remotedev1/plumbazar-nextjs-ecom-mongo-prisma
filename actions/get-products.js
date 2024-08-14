"use server";

import { db } from "@/lib/db";

export const getProducts = async () => {
  const products = await db.product.findMany({
    include: {
      brand: true,
      category: true,
    },
  });

  return products;
};
