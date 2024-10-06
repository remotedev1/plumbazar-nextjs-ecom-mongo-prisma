import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import productsList from "./json/data.json";
import cloudinary from "@/lib/cloudinary";
import { generateSlug } from "@/lib/helpers";
import axios from "axios";

// Utility to chunk an array
const chunkArray = (arr, chunkSize) => {
  let result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};
// Function to download an image from a URL
const downloadImage = async (url) => {
  const response = await axios({
    url,
    method: "GET",
    responseType: "arraybuffer",
  });
  return Buffer.from(response.data, "binary").toString("base64");
};

// Function to upload a single image to Cloudinary
const uploadSingleImage = async (image, folderPath) => {
  try {
    if (typeof image === "string" && image.startsWith("data:image/")) {
      const result = await cloudinary.uploader.upload(image, {
        folder: folderPath,
      });
      return result.secure_url;
    } else if (typeof image === "string" && image.startsWith("http")) {
      const downloadedImage = await downloadImage(image);
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${downloadedImage}`,
        {
          folder: folderPath,
        }
      );
      return result.secure_url;
    } else {
      throw new Error("Invalid image format");
    }
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

// Function to upload all images for a product, stopping on failure
const uploadImagesForProduct = async (images, folderPath) => {
  const uploadedImages = [];
  for (const image of images) {
    try {
      const uploadedImageUrl = await uploadSingleImage(image, folderPath);
      uploadedImages.push(uploadedImageUrl);
    } catch (error) {
      console.error(
        "Stopping image uploads for this product due to error:",
        error
      );
      return null; // Return null if any image fails to upload
    }
  }
  return uploadedImages; // Return all successfully uploaded images
};

export async function GET() {
  try {
    const { user } = await auth();
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!Array.isArray(productsList)) {
      return new NextResponse(
        "Invalid data format. Expected an array of products.",
        { status: 400 }
      );
    }

    const productsToCreate = [];
    const errors = [];
    let failedProductInfo = null; // To store info about the failed product

    // Iterate through the products
    for (const [index, productData] of productsList.entries()) {
      let {
        name,
        mrp,
        msp,
        brandId,
        description,
        categoryId,
        images,
        images2,
        sellOnline,
      } = productData;

      if (!name) {
        errors.push(`Product at index ${index} is missing a name.`);
        continue;
      }

      const allImages = [
        ...(images ? [images] : []),
        ...(images2 ? [images2] : []),
      ];
      const uniqueImages = Array.from(new Set(allImages));

      if (uniqueImages.length === 0) {
        errors.push(`Product ${name} has no images.`);
        continue;
      }

      // Validate and process MRP and MSP
      mrp = Math.round(parseFloat(mrp.replace(/,/g, "")));
      msp = Math.round(parseFloat(msp.replace(/,/g, "")));

      brandId = brandId?.trim();
      categoryId = categoryId?.trim();
      sellOnline = sellOnline === "true";

      if (isNaN(mrp) || mrp < 0) {
        errors.push(`Product ${name} has an invalid MRP.`);
        continue;
      }
      if (isNaN(msp) || msp < 0) {
        errors.push(`Product ${name} has an invalid MSP.`);
        continue;
      }
      if (!brandId) {
        errors.push(`Product ${name} is missing a brand ID.`);
        continue;
      }
      if (!categoryId) {
        errors.push(`Product ${name} is missing a category ID.`);
        continue;
      }

      // Upload images to Cloudinary for the current product
      const folderPath = "products";
      const uploadedImages = await uploadImagesForProduct(
        uniqueImages,
        folderPath
      );

      // If image upload fails, capture the failure details and break the loop
      if (!uploadedImages) {
        console.error(
          `Image upload failed for product ${name} at index ${index}. Stopping further uploads.`
        );
        failedProductInfo = { name, index }; // Store failed product info
        break; // Exit the loop and proceed to upload only successful products
      }

      // Prepare the product data
      const product = {
        name,
        description,
        mrp,
        msp,
        brandId,
        categoryId,
        images: uploadedImages, // Store Cloudinary image URLs
        postedBy: user.id,
        slug: generateSlug(name),
        sellOnline,
      };
      console.log(`${index + 1} - ${name}`);
      productsToCreate.push(product);
    }

    // If products were successfully processed, upload them to the database
    if (productsToCreate.length > 0) {
      // Chunk product insertions to avoid overloading the database
      const CHUNK_SIZE = 100;
      const chunkedProducts = chunkArray(productsToCreate, CHUNK_SIZE);

      for (const chunk of chunkedProducts) {
        await db.product.createMany({ data: chunk });
      }

      // If there was an image upload failure, return that information
      if (failedProductInfo) {
        return NextResponse.json({
          message:
            "Some products were created, but image upload failed for one product.",
          failedProduct: failedProductInfo, // Return the failed product info
        });
      }

      return NextResponse.json({ message: "Products created successfully" });
    } else {
      console.log("No products were successfully processed.");
      return NextResponse.json({
        message: "No products created due to image upload failure.",
        failedProduct: failedProductInfo, // Include failed product info
      });
    }
  } catch (error) {
    console.log("[PRODUCT_POST_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
