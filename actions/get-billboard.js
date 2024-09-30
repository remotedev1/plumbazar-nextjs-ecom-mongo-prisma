"use server";

import { db } from "@/lib/db";

export const getBillboard = async () => {
  const billboards = await db.billboard.findMany();

  return billboards;
};
