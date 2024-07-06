"use server";

import { db } from "@/lib/db";

export const getCategories = async () => {
  const Categories = await db.category.findMany({});

  return Categories;
};
