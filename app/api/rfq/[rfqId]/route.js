import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Getting rfq by user
export async function GET(req, { params }) {
  try {
    const { user } = await auth(); // we have access to the user id here that wants to create new store using our api

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const rfq = await db.rfq.findMany({
      where: {
        userId: user.id,
        id: params.rfqId,
      },
      include: {
        user: {
          select: {
            name: true,
            address: true,
          },
        },
      },
    });

    return NextResponse.json(rfq);
  } catch (error) {
    console.log(`[RFQ_GET] ${error}`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}



export async function PATCH(req, { params }) {
  try {
    const { user } = await auth();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { phone, notes, images } = body;

    // General query to update the product
    await db.rfq.update({
      where: {
        id: params.rfqId,
        userId: user.id,
      },
      data: {
        phone,
        notes,
        images,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(`[PRODUCT_PATCH] `, error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}


