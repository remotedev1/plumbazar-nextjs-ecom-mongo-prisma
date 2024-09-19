import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// POST request to add a new offer
export async function PATCH(req, { params }) {
  try {
    const offerId = params.id;
    const body = await req.json();

    // Validate required fields
    const {
      description,
      discountPercentage,
      validFrom,
      validUntil,
      type,
      productIds,
    } = body;

    // Update offer
    const updatedOffer = await db.offer.update({
      where: { id: offerId },
      data: {
        description,
        discountPercentage,
        validFrom: validFrom ? new Date(validFrom) : undefined,
        validUntil: validUntil ? new Date(validUntil) : undefined,
        type,
        products: {
          set: productIds ? productIds.map((id) => ({ id })) : [],
        },
      },
      include: {
        products: true, // Include associated products
      },
    });

    return NextResponse.json({ offer: updatedOffer }, { status: 200 });
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
    await db.product.updateMany({
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
