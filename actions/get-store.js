"use server";

import { db } from "@/lib/db";

export const getStore= async () => {
  const product = await db.store.findFirst({});

  // return product
  return product;
};
