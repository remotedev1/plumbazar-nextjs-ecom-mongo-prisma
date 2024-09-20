import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// PATCH request to add a new offer
export async function PATCH(req, { params }) {
  try {
    const body = await req.json();

    // Destructure required fields
    const {
      title,
      description,
      discountPercentage,
      validFrom,
      validUntil,
      productIds,
      brandIds,
      categoryIds,
    } = body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !discountPercentage ||
      !validFrom ||
      !validUntil
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch products based on the selected brands or categories
    let products = [];
    if (brandIds && brandIds.length > 0) {
      const brandProducts = await db.product.findMany({
        where: {
          brandId: { in: brandIds },
        },
      });
      products.push(...brandProducts);
    }

    if (categoryIds && categoryIds.length > 0) {
      const categoryProducts = await db.product.findMany({
        where: {
          categoryId: { in: categoryIds },
        },
      });
      products.push(...categoryProducts);
    }

    // Add specific products
    if (productIds && productIds.length > 0) {
      const specificProducts = await db.product.findMany({
        where: {
          id: { in: productIds },
        },
      });
      products.push(...specificProducts);
    }

    // Ensure unique products
    const uniqueProductIds = [
      ...new Set(products.map((product) => product.id)),
    ];

    // Fetch existing offer
    const existingOffer = await db.offer.findUnique({
      where: { id: params.offerId },
      include: { products: true }, // Include existing products in the offer
    });

    if (!existingOffer) {
      return NextResponse.json({ message: "Offer not found" }, { status: 404 });
    }

    const existingProductIds = existingOffer.products.map(
      (product) => product.id
    );

    // Find products to disconnect (products that are not in the updated product list)
    const productsToRemove = existingProductIds.filter(
      (id) => !uniqueProductIds.includes(id)
    );

    // Use a transaction to ensure atomicity
    const transactionResult = await db.$transaction(async (tx) => {
      // Remove the offer from products that are no longer part of the offer
      await Promise.all(
        productsToRemove.map(async (productId) => {
          await tx.product.update({
            where: { id: productId },
            data: {
              offers: {
                disconnect: { id: params.offerId }, // Remove the offer from the product
              },
            },
          });
        })
      );

      // Update the offer with new data
      const updatedOffer = await tx.offer.update({
        where: { id: params.offerId },
        data: {
          title,
          description,
          discountPercentage,
          validFrom: new Date(validFrom),
          validUntil: new Date(validUntil),
          products: {
            connect: uniqueProductIds.map((productId) => ({ id: productId })),
          },
          brands: brandIds,
          categories: categoryIds,
        },
      });

      // Update each product's offerId array
      await Promise.all(
        uniqueProductIds.map(async (productId) => {
          const product = await tx.product.findUnique({
            where: { id: productId },
            select: { offerId: true }, // Get the current offerId array
          });

          if (!product.offerId.includes(params.offerId)) {
            await tx.product.update({
              where: { id: productId },
              data: {
                offers: {
                  connect: { id: params.offerId },
                },
              },
            });
          }
        })
      );

      return updatedOffer;
    });

    return NextResponse.json({ offer: transactionResult }, { status: 200 });
  } catch (error) {
    console.error("Error updating offer:", error);
    return NextResponse.json(
      { message: "Failed to update offer" },
      { status: 500 }
    );
  }
}

// DELETE request to soft delete an offer by ID// DELETE request to soft delete an offer by ID
export async function DELETE(req, { params }) {
  try {
    const offerId = params.offerId;

    // Remove the association between the offer and all products
    await db.product.update({
      where: {
        offers: {
          some: {
            id: offerId,
          },
        },
      },
      data: {
        offers: {
          disconnect: { id: offerId }, // Disconnect the offer from products
        },
      },
    });

    // Soft delete the offer
    await db.offer.update({
      where: { id: offerId },
      data: {
        deletedAt: new Date(), // Set deletedAt to the current date and time
      },
    });

    return NextResponse.json(
      { message: "Offer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting offer:", error);
    return NextResponse.json(
      { message: "Failed to delete offer" },
      { status: 500 }
    );
  }
}
