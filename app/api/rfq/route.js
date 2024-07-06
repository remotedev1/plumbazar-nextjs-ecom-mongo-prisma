import { auth } from "@/auth";
import { db } from "@/lib/db";
import { SendRfqNotification } from "@/lib/mailService";
import { RfqSchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const validatedFields = RfqSchema.safeParse(body);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { images, phone, notes } = validatedFields.data;

    const { user } = await auth();

    if (!user) {
      return new NextResponse("Please sign in", { status: 400 });
    }

    const newRfq = await db.rfq.create({
      data: {
        userId: user.id,
        phone: Number(phone),
        notes: notes,
        images: images.map((image) => image.url),
      },
    });

    //send email update to admin
    await SendRfqNotification(
      //TODO
      "enquiry@plumbazar.com"
    );

    return NextResponse.json({
      newRfq,
      success: `RFQ submitted successfully!`,
    });
  } catch (error) {
    console.log(`[RFQ_POST] ${error}`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Getting all the rfq's
export async function GET(req) {
  try {
    const { user } = await auth(); // we have access to the user id here that wants to create new store using our api
    let rfq = [];

    if (user.role === "ADMIN") {
      rfq = await db.rfq.findMany({
        include: {
          user: {
            select: {
              name: true,
              address: true,
            },
          },
        },
      });
    } else {
      rfq = await db.rfq.findMany({
        where: {
          userId: user.id,
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
    }
    return NextResponse.json(rfq);
  } catch (error) {
    console.log(`[RFQ_GET] ${error}`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
