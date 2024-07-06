import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { user } = await auth(); // we have access to the user id here that wants to create new store using our api

    const body = await req.json();
    const { label, imageUrl, category } = body;

    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }
    if (!category) {
      return new NextResponse("category is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    // create new billboard using prisma client instance and return the billboard data to the client

    const billboard = await db.billboard.create({
      data: {
        label,
        imageUrl,
        category: { connect: { id: category } },
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log(`[BILLBOARDS_POST] ${error}`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Getting all the billboards for a store by storeId

export async function GET(req, { params }) {
  try {
    const { user } = await auth(); // we have access to the user id here that wants to create new store using our api

    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    // get all the billboard

    const billboards = await db.billboard.findMany({});

    return NextResponse.json(billboards);
  } catch (error) {
    console.log(`[BILLBOARDS_GET] ${error}`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
