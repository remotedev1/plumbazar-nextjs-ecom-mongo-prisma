import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/db";
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

    if (!images) {
      return new NextResponse("Images are required", { status: 400 });
    }

    // Upload images to Cloudinary
    const folderPath = "rfq";

    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        if (image instanceof File) {
          const arrayBuffer = await image.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const result = await cloudinary.uploader.upload(
            `data:${image.type};base64,${buffer.toString("base64")}`,
            { folder: folderPath }
          );
          return { url: result.secure_url };
        } else {
          throw new Error("Invalid file format");
        }
      })
    );

    const newRfq = await db.rfq.create({
      data: {
        userId: user.id,
        phone: phone,
        notes: notes,
        images: uploadedImages.map((img) => img.url),
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

    if (user.role !== "USER") {
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
