import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const isFeatured = searchParams.get("isFeatured");
    const id = searchParams.get("id");

    // Pagination parameters
    const skip = parseInt(searchParams.get("skip") || "0", 20); // Start at 0 by default
    const take = parseInt(searchParams.get("take") || "20", 20); // Fetch 10 items by default

    // Initialize filter conditions
    const filters = {
      isArchived: false, 
    };

    // Prioritize by ID if provided
    if (id) {
      filters.id = id;
    }

    // Add query filter for name (case-insensitive)
    if (query && query.trim() !== "") {
      filters.name = {
        contains: query,
        mode: "insensitive",
      };
    }

    // Add category filter if provided
    if (category && category.trim() !== "") {
      filters.category = {
        name: {
          contains: category,
          mode: "insensitive",
        },
      };
    }

    // Add brand filter if provided
    if (brand && brand.trim() !== "") {
      filters.brand = {
        name: {
          contains: brand,
          mode: "insensitive",
        },
      };
    }

    // Filter by isFeatured (convert string to boolean)
    if (isFeatured !== null && isFeatured !== undefined) {
      filters.isFeatured = isFeatured === "true";
    }

    // Fetch products from the database with pagination
    const products = await db.product.findMany({
      where: filters,
      skip, // Skip the number of records passed
      take, // Limit the results
      include: {
        category: true, // Include category data
        brand: true, // Include brand data
      },
    });

    // Return the filtered products as JSON
    return NextResponse.json(products);

  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
