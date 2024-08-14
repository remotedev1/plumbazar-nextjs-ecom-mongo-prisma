"use server";

import { db } from "@/lib/db";

export const getBrands = async () => {
  const Brands = await db.brand.findMany({});

  return Brands;
};
