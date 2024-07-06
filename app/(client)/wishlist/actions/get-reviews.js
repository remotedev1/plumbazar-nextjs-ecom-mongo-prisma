"use server";

import { db } from "@/lib/db";

export const getReview = async (id) => {
  const reviews = await db.review.findMany({
    where: {
      productId:id,
    },
    include:{
      user: true
    }
  });

  // return reviews
  return reviews;
};
