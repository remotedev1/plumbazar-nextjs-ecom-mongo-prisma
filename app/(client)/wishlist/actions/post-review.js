"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { PostReviewSchema } from "@/schemas";

export const postReview = async (values) => {
  const validatedFields = PostReviewSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { user } = await auth();

  if (!user) return { error: "Please sign in!" };

  const { productId, rating, title, review } = validatedFields.data;

  try {
    //check if user has purchased the product
    const purchased = await db.order.findMany({
      where: {
        userId: user.id,
        orderItems: {
          some: {
            product: {
              id: productId,
            },
          },
        },
      },
    });
    if (!purchased.length > 0)
      return { error: "Please purchase the product, to write a review!" };

    // Create a new review
    const newReview = await db.review.create({
      data: {
        productId: productId,
        userId: user.id,
        rating: rating,
        title: title,
        review: review,
      },
    });

    // Get the product with current ratings information
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    // Calculate the new average rating for the product
    const totalRatings = product.globalRating * product.numReviews; // Calculate total ratings
    const newRating = (totalRatings + rating) / (product.numReviews + 1); // Calculate new rating
    const updatedProduct = await db.product.update({
      where: {
        id: productId,
      },
      data: {
        globalRating: newRating, // Update the product with the new rating
        numReviews: product.numReviews + 1, // Increment the total number of reviews
      },
    });

    return {
      success: `Review submitted successfully!`,
    };
  } catch (error) {
    console.error("Error posting review:", error);
    return null;
  }
};
