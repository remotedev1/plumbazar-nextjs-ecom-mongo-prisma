import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user } = await auth(); // we have access to the user id here that wants to create new store using our api

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    if (!user) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // create new store using prisma client instance and return the store data to the client
    const store = await db.store.create({
      data: {
        name,
        userId: user.id,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log(`[STORES_POST] ${error}`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
