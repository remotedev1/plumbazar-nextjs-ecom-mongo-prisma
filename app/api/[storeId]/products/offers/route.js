import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// POST request to add a new offer
export async function POST(req) {
  try {
    const body = await req.json();

    // Validate required fields
    const {
      title,
      description,
      discountPercentage,
      validFrom,
      validUntil,
      productIds,
    } = body;

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

    // Create the new offer and connect to the products
    const newOffer = await db.offer.create({
      data: {
        title,
        description,
        discountPercentage,
        validFrom: new Date(validFrom),
        validUntil: new Date(validUntil),
        products: {
          connect: productIds.map((productId) => ({ id: productId })),
        },
      },
    });

    return NextResponse.json({ offer: newOffer }, { status: 201 });
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
