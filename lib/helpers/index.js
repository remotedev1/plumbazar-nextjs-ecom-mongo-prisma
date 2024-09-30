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

export function calculateDiscountAndGST(data) {
  const { msp, mrp, gst, offers = [] } = data;

  // Return default values if no valid offers
  if (!offers.length) {
    return {
      offerId: null,
      discountPercentage: 0,
      discountAmount: msp,
      gstAmount: (msp * gst) / 100, // Calculate GST on MSP
    };
  }

  const currentDate = new Date();

  // Find valid offers within the current date range and without a deletedAt field
  const validOffers = offers.filter(({ validFrom, validUntil, deletedAt }) => {
    const from = new Date(validFrom);
    const until = new Date(validUntil);
    return (
      currentDate >= from &&
      currentDate <= until &&
      !deletedAt // Check if deletedAt is not present
    );
  });

  // If no valid offers, return default values
  if (!validOffers.length) {
    return {
      offerId: null,
      discountPercentage: 0,
      discountAmount: msp,
      gstAmount: (msp * gst) / 100,
    };
  }

  // Find the offer with the highest discount percentage
  const { discountPercentage = 0, id: offerId } = validOffers.reduce(
    (maxOffer, offer) =>
      (offer.discountPercentage || 0) > (maxOffer.discountPercentage || 0)
        ? offer
        : maxOffer,
    { discountPercentage: 0 } // Initial value for reduce
  );

  // Calculate discount and GST on the discounted MSP
  const discountAmount = Math.ceil(msp - (msp * discountPercentage) / 100);
  const gstAmount = (discountAmount * gst) / 100;

  return {
    offerId,
    discountPercentage,
    discountAmount,
    gstAmount,
  };
}


// Helper function to generate slug
export function generateSlug(text) {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word characters with a dash
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing dashes
}
