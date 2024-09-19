import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const rupeeFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

// Create a currency formatter for US dollars (USD)
export const dollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency", // Format the number as currency
  currency: "USD", // Use US dollars as the currency symbol
});

export const isPrismaIdValid = (id) => {
  // Regular expression to match UUID format
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  // Regular expression to match integer format
  const integerRegex = /^[0-9]+$/;

  // Check if the provided ID matches either UUID or integer format
  return uuidRegex.test(id) || integerRegex.test(id);
};


export function convertTimestampToFormattedDate(timestamp) {
  // Create a new Date object from the timestamp string
  const date = new Date(timestamp);
  
  // Get the year, month, and day from the date object
  const year = date.getFullYear();
  // Add 1 to month because JavaScript months are zero-based
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  // Construct the formatted date string
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function calculateRatingPercentages(reviews) {
  // Initialize an object to store the count of each rating value
  const ratingCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };

  // Iterate through the reviews array and count the occurrences of each rating value
  reviews.forEach(review => {
    ratingCounts[review.rating]++;
  });

  // Calculate the total number of reviews
  const totalReviews = reviews.length;

  // Calculate the percentage of each rating value
  const ratingPercentages = {};
  for (let rating = 1; rating <= 5; rating++) {
    const percentage = (ratingCounts[rating] / totalReviews) * 100 || 0; // Calculate the percentage, default to 0 if no reviews with that rating
    ratingPercentages[rating] = percentage.toFixed(2); // Store the percentage rounded to 2 decimal places
  }

  return ratingPercentages;
}