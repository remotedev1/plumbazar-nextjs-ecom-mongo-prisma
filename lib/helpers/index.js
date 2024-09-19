import { db } from "@/lib/db";
import numberToWords from "number-to-words";

export const getUserByEmail = async (email) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    return user;
  } catch (err) {
    // console.log(err);
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch (err) {
    // console.log(err);
    return null;
  }
};

// Utils

/**
 * Formats a number with commas and decimal places
 *
 * @param {number} number - Number to format
 * @returns {string} A styled number to be displayed on the invoice
 */
export const formatNumberWithCommas = (number) => {
  return number.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Turns a number into words for invoices
 *
 * @param {number} price - Number to format
 * @returns {string} Number in words
 */
export const formatPriceToString = (price) => {
  if (!price) {
    return "Zero";
  }
  // Split the price into integer and fractional parts (Dollar and Cents)
  const integerPart = Math.floor(price);
  const fractionalPart = Math.round((price - integerPart) * 100);

  // Convert the integer part to words with capitalized first letter
  const integerPartInWords = numberToWords
    .toWords(integerPart)
    .replace(/^\w/, (c) => c.toUpperCase());

  // Create the result string without fractional part if it's zero
  let result = integerPartInWords;

  // Append fractional part only if it's not zero
  if (fractionalPart !== 0) {
    result += ` and ${fractionalPart}/100`;
  }

  // Handle the case when both integer and fractional parts are zero
  if (integerPart === 0 && fractionalPart === 0) {
    return "Zero";
  }

  return result;
};

export const bufferObjectToBase64 = (bufferObject, mimeType = "image/jpeg") => {
  if (bufferObject.type === "Buffer" && Array.isArray(bufferObject.data)) {
    const buffer = Buffer.from(bufferObject.data);
    return `data:${mimeType};base64,${buffer.toString("base64")}`;
  }
  throw new Error("Invalid buffer object");
};

/**
 * Dynamically imports and retrieves an invoice template React component based on the provided template ID.
 *
 * @param {number} templateId - The ID of the invoice template.
 * @returns {Promise<React.ComponentType<any> | null>} A promise that resolves to the invoice template component or null if not found.
 * @throws {Error} Throws an error if there is an issue with the dynamic import or if a default template is not available.
 */
export const getInvoiceTemplate = async (templateId) => {
  // Dynamic template component name
  const componentName = `InvoiceTemplate${templateId}`;

  try {
    const modules = await import(
      `@/components/common/templates/invoice-pdf/${componentName}`
    );
    return modules.default;
  } catch (err) {
    console.error(`Error importing template ${componentName}: ${err}`);

    // Provide a default template
    return null;
  }
};

export const generateInvoiceNumber = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0"); // Ensures two-digit day
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Ensures two-digit month
  const year = String(today.getFullYear()).slice(-2); // Gets the last two digits of the year
  const uniqueIdentifier = Date.now().toString().slice(-6); // Uses the last 6 digits of the timestamp for uniqueness
  return `PLUM-RFQ-${day}-${month}-${year}-${uniqueIdentifier}`;
};

export function calculateDiscountPercentage(originalPrice, discountedPrice) {
  if (
    originalPrice <= 0 ||
    discountedPrice <= 0 ||
    discountedPrice > originalPrice
  ) {
    return 0; // Handle invalid prices gracefully
  }
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}

export function generateSlug(name) {
  return name
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9]+/g, "-") // Replace spaces and special characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
}

/**
 * Calculate discount and GST based on the highest discount offer.
 * @param {Object} data - Object containing product details and offers.
 * @param {number} data.mrp - The maximum retail price.
 * @param {number} data.msp - The maximum selling price.
 * @param {number} data.gst - The GST percentage.
 * @param {Array} data.offers - Array of offer objects.
 * @returns {Object} - Object containing the discount percentage, discount amount, and GST amount.
 */
export function calculateDiscountAndGST(data) {
  // Ensure offers array is defined and not empty
  if (!data.offers || data.offers.length === 0) {
    return {
      discountPercentage: 0,
      discountAmount: 0,
      gstAmount: (data.msp * data.gst) / 100, // Calculate GST on MSP
    };
  }

  // Find the highest discount percentage from the offers array
  const highestOffer = data.offers.reduce((maxOffer, offer) => {
    return (offer.discountPercentage || 0) > (maxOffer.discountPercentage || 0)
      ? offer
      : maxOffer;
  }, {});

  const highestDiscountPercentage = highestOffer.discountPercentage || 0;

  // Calculate the discount on MRP
  const discountAmount = (data.mrp * highestDiscountPercentage) / 100;

  // Calculate GST on MSP
  const gstAmount = (data.msp * data.gst) / 100;

  return {
    discountPercentage: highestDiscountPercentage,
    discountAmount,
    gstAmount,
  };
}
