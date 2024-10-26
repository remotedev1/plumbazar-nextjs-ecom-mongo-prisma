import { auth } from "@/auth";
import { db } from "@/lib/db";
import { checkAuthorization } from "@/lib/helpers";
import { NextResponse } from "next/server";

// Getting all the rfq's
export async function GET(req) {
  try {
    const { user } = await auth(); // we have access to the user id here that wants to create new store using our api
    // Check if the user is authorized
    if (!checkAuthorization(user, ["SUPERADMIN", "SALES", "ADMIN"])) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const rfq = await db.rfq.findMany({
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
