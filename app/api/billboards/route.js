import { auth } from "@/auth";
import { db } from "@/lib/db";
import { checkAuthorization } from "@/lib/helpers";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { user } = await auth();
    // Check if the user is authorized
    if (!checkAuthorization(user, ["SUPERADMIN"])) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const formData = await req.formData();

    const action = formData.get("action");
    const images = formData.getAll("newImages");

    // Validations
    if (!images || images.length === 0) {
      return new NextResponse("Images are required", { status: 400 });
    }

    // Process new images to base64 format
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        if (!(image instanceof File)) {
          throw new Error("Invalid file format");
        }
        const arrayBuffer = await image.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString("base64");
        return `data:${image.type};base64,${base64String}`; // Convert image to base64 format
      })
    );

    // Create new billboard using Prisma client instance
    const billboard = await db.billboard.create({
      data: {
        postedBy: user.id,
        action,
        images: uploadedImages, // Store base64 images directly
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

    // get all the billboard

    const billboards = await db.billboard.findMany({});

    return NextResponse.json(billboards);
  } catch (error) {
    console.log(`[BILLBOARDS_GET] ${error}`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
