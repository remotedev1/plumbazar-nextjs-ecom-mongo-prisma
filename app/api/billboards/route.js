import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { user } = await auth(); // we have access to the user id here that wants to create new store using our api
    const formData = await req.formData();

    const action = formData.get("action");
    const images = formData.getAll("newImages");

 
    if (!images) {
      return new NextResponse("images is required", { status: 400 });
    }



    // Upload images to Cloudinary path
    const folderPath = "billboards";
    // Upload images to Cloudinary
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

    // create new billboard using prisma client instance and return the billboard data to the client

    const billboard = await db.billboard.create({
      data: {
        postedBy: user.id,
        action,
        images: uploadedImages.map((img) => img.url),
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log(`[BILLBOARDS_POST] ${error}`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Getting all the billboards for a store by storeId

export async function GET(req, { params }) {
  try {
    const { user } = await auth(); // we have access to the user id here that wants to create new store using our api

    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    // get all the billboard

    const billboards = await db.billboard.findMany({});

    return NextResponse.json(billboards);
  } catch (error) {
    console.log(`[BILLBOARDS_GET] ${error}`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
