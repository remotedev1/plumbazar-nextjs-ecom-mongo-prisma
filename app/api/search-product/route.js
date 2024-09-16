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

    // Pagination parameters with defaults
    const skip = parseInt(searchParams.get("skip") || "0", 10); // Start at 0 by default
    const take = parseInt(searchParams.get("take") || "10", 10); // Fetch 10 items by default
    const fetchCount = searchParams.get("fetchCount") === "true"; // Flag to fetch total count or not

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

    let totalProducts = 0;
    // Fetch total count if fetchCount is true (on first load or filter change)
    if (fetchCount) {
      totalProducts = await db.product.count({
        where: filters,
      });
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

    // Check if there are more products to load
    const hasMore = products.length === take;

    // Return the products along with pagination data if `fetchCount` is true
    return NextResponse.json({
      products,
      ...(fetchCount ? { total: totalProducts } : {}), // Include total count only if requested
      hasMore,
    });

  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
