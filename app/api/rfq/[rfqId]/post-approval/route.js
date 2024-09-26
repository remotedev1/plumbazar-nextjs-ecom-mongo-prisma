import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    const { user } = await auth();

    const { draftId } = body;

    // Update the DraftInvoice with new data
    const updatedDraftInvoice = await db.draftInvoice.update({
      where: { id: draftId },
      data: {
        userId: user.id,
        status: "APPROVED",
      },
    });

    return NextResponse.json(updatedDraftInvoice, { status: 200 });
  } catch (error) {
    console.error("Error updating draft invoice:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
