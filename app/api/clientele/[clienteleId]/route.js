import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req, { params }) {
  try {
    if (!params.clienteleId) {
      return new NextResponse("clientele id is required", { status: 400 });
    }

    const clientele = await db.clientele.findUnique({
      where: {
        id: params.clienteleId,
      },
    });

    return NextResponse.json(clientele);
  } catch (error) {
    console.log("[CLIENTELE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { user } = await auth();
    if (user.role !== "ADMIN" || user.role !== "SUPERADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.clienteleId) {
      return new NextResponse("clientele id is required", { status: 400 });
    }

    const clientele = await db.clientele.findUnique({
      where: {
        id: params.clienteleId,
      },
    });

    if (!clientele) {
      return new NextResponse("clientele not found", { status: 404 });
    }

    await db.clientele.delete({
      where: {
        id: params.clienteleId,
      },
    });

    return NextResponse.json({ message: "clientele deleted successfully" });
  } catch (error) {
    console.log("[CLIENTELE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { user } = await auth();

    // Authorization check
    if (user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.clienteleId) {
      return new NextResponse("Clientele ID is required", { status: 400 });
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const images = formData.getAll("images"); // Existing images
    const newImages = formData.getAll("newImages"); // New images to be uploaded

    // Validations
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // Fetch current clientele data from the database
    const currentClientele = await db.clientele.findUnique({
      where: { id: params.clienteleId },
    });

    if (!currentClientele) {
      return new NextResponse("Clientele not found", { status: 404 });
    }

    // Process new images to base64 format
    const uploadedImages = await Promise.all(
      newImages.map(async (image) => {
        if (!(image instanceof File)) {
          throw new Error("Invalid file format");
        }
        const arrayBuffer = await image.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString("base64");
        return `data:${image.type};base64,${base64String}`;
      })
    );

    // Combine retained existing images and newly uploaded images
    const finalImages = [...images, ...uploadedImages].flat();

    // Update the clientele in the database
    const updatedClientele = await db.clientele.update({
      where: { id: params.clienteleId },
      data: {
        name,
        images: finalImages,
      },
    });

    return NextResponse.json(updatedClientele);
  } catch (error) {
    console.error("[CLIENTELE_PATCH]", error);

    if (error.message === "Invalid file format") {
      return new NextResponse("Invalid file format", { status: 400 });
    }

    return new NextResponse("Internal error", { status: 500 });
  }
}
