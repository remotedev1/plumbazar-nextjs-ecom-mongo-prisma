import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// POST request to add a new offer
export async function POST(req) {
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

    // Use a transaction to ensure atomicity
    const transactionResult = await db.$transaction(async (tx) => {
      // Create the new offer
      const newOffer = await tx.offer.create({
        data: {
          title,
          description,
          discountPercentage,
          validFrom: new Date(validFrom),
          validUntil: new Date(validUntil),
          products: {
            connect: uniqueProductIds.map((productId) => ({ id: productId })),
          },
        },
      });

      // Update each product's offerId array
      await Promise.all(
        uniqueProductIds.map(async (productId) => {
          const product = await tx.product.findUnique({
            where: { id: productId },
            select: { offerId: true }, // Get the current offerId array
          });

          if (!product.offerId.includes(newOffer.id)) {
            await tx.product.update({
              where: { id: productId },
              data: {
                offerId: {
                  push: newOffer.id, // Only push if it doesn't already exist
                },
              },
            });
          }
        })
      );

      return newOffer;
    });

    return NextResponse.json({ offer: transactionResult }, { status: 201 });
  } catch (error) {
    console.error("Error creating offer:", error);
    return NextResponse.json(
      { message: "Failed to create offer" },
      { status: 500 }
    );
  }
}

// GET request to fetch offers
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const offerId = url.searchParams.get("id");

    // Build the query
    const query = {};
    if (offerId) {
      query["id"] = offerId;
    }

    // Fetch offers
    const offers = await db.offer.findMany({
      where: query,
      include: {
        products: true, // Include associated products
      },
    });

    return NextResponse.json({ offers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json(
      { message: "Failed to fetch offers" },
      { status: 500 }
    );
  }
}
