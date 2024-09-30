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

    await db.$transaction(async (transaction) => {
      // Create the DraftInvoice with relations
      const createdDraftInvoice = await transaction.draftInvoice.create({
        data: {
          userId: user.id,
          receiver: {
            set: {
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
          },
          details: {
            set: {
              invoiceNumber: details.invoiceNumber,
              invoiceDate: new Date(details.invoiceDate),
              dueDate: new Date(details.dueDate),
              items: details.items.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                msp: item.msp,
                gst: item.gst,
                total: item.quantity * item.msp,
              })),
              currency: details.currency || "INR",
              taxAmount: parseFloat(details.taxAmount),
              discountAmount: parseFloat(details.discountAmount),
              shippingAmount: parseFloat(details.shippingAmount),
              additionalNotes: details.additionalNotes,
              subTotal: details.subTotal,
              totalAmount: details.totalAmount,
            },
          },
          rfqId: params.rfqId,
        },
      });

      // Update the RFQ with the draft invoice ID
      await transaction.rfq.update({
        where: { id: params.rfqId },
        data: {
          draftId: createdDraftInvoice.id,
          status: "PROCESSING",
        },
      });
      // Return the created draft invoice
      return createdDraftInvoice;
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Error creating draft invoice:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    const { user } = await auth();

    const { receiver, details } = body;

    // Update the DraftInvoice with new data
    const updatedDraftInvoice = await db.draftInvoice.update({
      where: { id: details.draftId },
      data: {
        userId: user.id,
        receiver: {
          update: {
            name: receiver.name,
            address: receiver.address,
            zip: receiver.zip,
            city: receiver.city,
            country: receiver.country,
            email: receiver.email,
            phone: receiver.phone,
            customInputs: receiver.customInputs || [],
          },
        },
        details: {
          update: {
            items: details.items.map((item) => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              msp: item.msp,
              gst: item.gst,
              total: item.quantity * item.msp,
            })),
            taxAmount: parseFloat(details.taxAmount),
            discountAmount: parseFloat(details.discountAmount),
            shippingAmount: parseFloat(details.shippingAmount),
            additionalNotes: details.additionalNotes,
            subTotal: details.subTotal,
            totalAmount: details.totalAmount,
          },
        },
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
