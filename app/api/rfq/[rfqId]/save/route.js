import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    // Destructure validated data
    const { userId, customer, phone, address, products, paymentId, notes } =
      data;

    // Save draft invoice to the database using Prisma
    const draftInvoice = await db.draftInvoice.create({
      data: {
        userId,
        customer,
        phone,
        address: {
          create: address, 
        },
        products: {
          createMany: {
            data: products,
          },
        },
        paymentId,
        notes,
      },
    });

    return NextResponse.json({ success: true, draftInvoice });
  } catch (error) {
    console.error("Error saving draft invoice:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
