import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    const { user } = await auth();

    const {rfqId } = body;

    // Update the DraftInvoice with new data
    const updatedRfqInvoice = await db.rfq.update({
      where: { id: rfqId },
      data: {
        userId: user.id,
        status: "CANCELED",
      },
    });

    return NextResponse.json(updatedRfqInvoice, { status: 200 });
  } catch (error) {
    console.error("Error updating rfq :", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
