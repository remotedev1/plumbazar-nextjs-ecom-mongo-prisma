"use server";

import { db } from "@/lib/db";

export const getProducts = async () => {
  const products = await db.product.findMany({
    include: {
      // include the relations to get the full data of the product
      brand: true,
    },
  });

  return products;
};
