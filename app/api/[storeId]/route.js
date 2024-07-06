import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { user } = await auth();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = params;
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is Required", { status: 400 });
    }
    if (!storeId) {
      return new NextResponse("Store ID is Required", { status: 400 });
    }

    // find and update store
    const store = await db.store.updateMany({
      where: {
        id: storeId,
        userId: user.id,
      },
      data: {
        name,
      },
    });
    
    return NextResponse.json(store);
  } catch (error) {
    console.log(`[STORE_PATCH] `, error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { user } = await auth();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { storeId } = params;

    if (!storeId) {
      return new NextResponse("Store ID is Required", { status: 400 });
    }

    // find and update store

    const store = await db.store.deleteMany({
      where: {
        id: storeId,
        userId: user.id,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log(`[STORE_DELETE] `, error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
