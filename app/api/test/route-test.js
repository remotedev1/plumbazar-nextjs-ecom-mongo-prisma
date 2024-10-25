import { db } from "@/lib/db";
import axios from "axios";
import { Buffer } from "buffer";
import fs from "fs/promises"; // For reading the JSON file
import path from "path";
import { NextResponse } from "next/server";

// Helper function to download an image and convert it to base64
async function fetchImageAsBase64(url) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);
    return `data:image/jpeg;base64,${buffer.toString("base64")}`;
  } catch (error) {
    console.error(`Failed to fetch image from ${url}:`, error);
    return null;
  }
}

// Function to load and parse the JSON file
async function loadProductJson() {
  const filePath = path.join(process.cwd(), "json", "kitchen.json");
  const fileContent = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContent);
}

// Main migration function
async function migrateProductImages() {
  try {
    const productsInJson = await loadProductJson();

    // Fetch the relevant products from the database
    const dbProducts = await db.product.findMany({
      where: {
        categoryId: "66fc13d4be3bfeeffa32aa06",
      },
      select: { id: true, name: true, images: true },
    });

    let updatedCount = 0;
    const startTime = Date.now();

    // Iterate through each product in the JSON data
    for (const jsonProduct of productsInJson) {
      const matchingProduct = dbProducts.find(
        (dbProduct) => dbProduct.name.trim() === jsonProduct.name.trim()
      );

      if (matchingProduct) {
        console.log(`Match found for product: ${matchingProduct.name}`);

        // Combine `images` and `images2` into a single array, filtering only valid URLs
        const allImageUrls = [jsonProduct.images, jsonProduct.images2].filter(
          (url) => typeof url === "string" && url !== "" && url !== undefined
        );

        // // Fetch all images as base64
        const base64Images = await Promise.all(
          allImageUrls.map((url) => fetchImageAsBase64(url))
        );

        // // Filter out failed downloads (null values)
        const validBase64Images = base64Images.filter((img) => img !== null);

        if (validBase64Images.length > 0) {
          // Update the product with the new images
          await db.product.update({
            where: { id: matchingProduct.id },
            data: { images: validBase64Images },
          });

          updatedCount++;
          console.log(
            `Updated product ${matchingProduct.name}. Progress: ${updatedCount}/${productsInJson.length}`
          );
        } else {
          console.warn(`No valid images found for ${matchingProduct.name}`);
        }
      }
    }

    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(
      `Migration completed. Total products updated: ${updatedCount}. Time taken: ${elapsedTime} seconds`
    );

    return { status: "success", message: `Updated ${updatedCount} products.` };
  } catch (error) {
    console.error("Migration failed:", error);
    return { status: "error", message: error.message };
  }
}

// API Route Handler
export async function GET() {
  console.log("Migrating product images...");
  try {
    const result = await migrateProductImages();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
