import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req, { params }) {
  try {
    const body = await req.json();
    const { user } = await auth();
    if (!params.rfqId) {
      return new NextResponse("rfq ID is required", { status: 400 });
    }
    const { receiver, details } = body;

    // Create the DraftInvoice with relations
    const draftInvoice = await db.draftInvoice.create({
      data: {
        userId: user.id,
        receiver: {
          customerId: receiver.customerId,
          name: receiver.name,
          address: receiver.address,
          zip: receiver.zip,
          city: receiver.city,
          country: receiver.country,
          email: receiver.email,
          phone: receiver.phone,
          customInputs: receiver.customInputs || [],
        },
        details: {
          invoiceNumber: details.invoiceNumber,
          invoiceDate: new Date(details.invoiceDate),
          items: details.items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            purchasePrice: item.purchasePrice,
          })),
          currency: details.currency || "INR",
          taxAmount: details.taxAmount,
          discountAmount: details.discountAmount,
          shippingAmount: details.shippingAmount,
          additionalNotes: details.additionalNotes,
          totalAmountInWords: details.totalAmountInWords,
          subTotal: details.subTotal,
          totalAmount: details.totalAmount,
        },
        rfqId: params.rfqId,
      },
    });

    return NextResponse.json(draftInvoice, { status: 201 });
  } catch (error) {
    console.error("Error creating draft invoice:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
