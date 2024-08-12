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

export const bufferObjectToBase64 = (bufferObject, mimeType = 'image/jpeg') => {
  if (bufferObject.type === 'Buffer' && Array.isArray(bufferObject.data)) {
    const buffer = Buffer.from(bufferObject.data);
    return `data:${mimeType};base64,${buffer.toString('base64')}`;
  }
  throw new Error('Invalid buffer object');
};