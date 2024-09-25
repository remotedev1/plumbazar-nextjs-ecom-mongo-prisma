"use server";

import { db } from "@/lib/db";

export const getProduct = async (id) => {
  const product = await db.product.findFirst({
    where: {
      id,
    },
    include: {
      // include the relations to get the full data of the product
      brand: true,
      offers: true,
    },
  });

  // return product
  return product;
};
