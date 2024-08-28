"use server";

import { db } from "@/lib/db";

export const getBrands = async () => {
  const brands = await db.brand.findMany();
  return brands;
};
