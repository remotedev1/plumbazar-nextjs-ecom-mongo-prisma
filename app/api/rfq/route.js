import { auth } from "@/auth";
import { db } from "@/lib/db";
import { checkAuthorization } from "@/lib/helpers";
import { SendRfqNotification } from "@/lib/mailService";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user } = await auth();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const phone = formData.get("phone");
    const notes = formData.get("notes");
    const images = formData.getAll("newImages");

    if (!phone) {
      return new NextResponse("Phone number is required", { status: 400 });
    }

    if (!images || images.length === 0) {
      return new NextResponse("Images are required", { status: 400 });
    }

    // Convert images to Base64
    const base64Images = await Promise.all(
      images.map(async (image) => {
        if (image instanceof File) {
          const arrayBuffer = await image.arrayBuffer();
          const base64String = Buffer.from(arrayBuffer).toString("base64");
          return `data:${image.type};base64,${base64String}`;
        } else {
          throw new Error("Invalid file format");
        }
      })
    );

    // Save RFQ with images as Base64 strings
    const newRfq = await db.rfq.create({
      data: {
        userId: user.id,
        phone,
        notes,
        images: base64Images, // Store the Base64 strings directly
      },
    });

    // Send email notification to admin
    await SendRfqNotification("enquiry@plumbazar.com");

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
    const { user } = await auth();

    // Check if the user is authorized
    if (!checkAuthorization(user, ["SUPERADMIN", "SALES", "ADMIN", "USER"])) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const rfq = await db.rfq.findMany({
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
    return NextResponse.json(rfq);
  } catch (error) {
    console.log(`[RFQ_GET] ${error}`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
