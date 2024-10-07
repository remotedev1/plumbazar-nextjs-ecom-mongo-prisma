export const dynamic = "force-dynamic";

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
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const take = parseInt(searchParams.get("take") || "10", 10);
    const fetchCount = searchParams.get("fetchCount") === "true"; // Flag to fetch total count or not

    // Initialize filter conditions
    const filters = {
      isArchived: false,
    };

    // Filter by ID if provided
    if (id) {
      filters.id = id;
    }

    // Add query filter for name (case-insensitive)
    if (query && query.trim()) {
      const terms = query.trim().split(/\s+/); // Split query into terms by whitespace
      filters.OR = terms.map((term) => ({
        name: {
          contains: term,
          mode: "insensitive",
        },
      }));
    }

    // Add category filter if provided
    if (category && category.trim()) {
      filters.category = {
        name: {
          contains: category,
          mode: "insensitive",
        },
      };
    }

    // Add brand filter if provided
    if (brand && brand.trim()) {
      filters.brand = {
        name: {
          contains: brand,
          mode: "insensitive",
        },
      };
    }

    // Convert `isFeatured` string to a boolean
    if (isFeatured !== null && isFeatured !== undefined) {
      filters.isFeatured = isFeatured === "true";
    }

    // Fetch total count only if `fetchCount` is true
    let totalProducts = 0;
    if (fetchCount) {
      totalProducts = await db.product.count({
        where: filters,
      });
    }

    // Fetch products with pagination
    const products = await db.product.findMany({
      where: filters,
      skip,
      take,
      include: {
        category: true,
        brand: true,
        offers: true,
      },
    });

    // Check if there are more products to load (used for "Load More" feature)
    const hasMore = products.length === take;

    // Return the products and total count if requested
    return NextResponse.json({
      products,
      ...(fetchCount ? { totalProducts } : {}), // Conditionally return total products
      hasMore,
    });
  } catch (error) {
    console.error("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
