import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Save the contact form data to the database
    await db.contactUs.create({
      data: {
        name,
        email,
        phone,
        message,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
export async function GET(req, { params }) {
  try {
    const contacts = await db.contactUs.findMany({
      orderBy: {
        createdAt: "desc", // Orders the records by most recent first
      },
    });

    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch contact submissions" },
      { status: 500 }
    );
  }
}
