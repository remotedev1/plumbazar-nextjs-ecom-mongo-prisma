"use server";

import { db } from "@/lib/db";

export const getColors = async () => {
  const colors = await db.color.findMany({});

  return colors;
};
