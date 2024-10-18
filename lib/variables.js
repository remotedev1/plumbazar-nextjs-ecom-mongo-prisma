export const StoreId = "66fc0f5880a5c4812c596eed";
/**
 * Environment
 */
export const ENV = process.env.NODE_ENV;
/**
 * Form date options
 */
export const DATE_OPTIONS = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const SHORT_DATE_OPTIONS = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

/**
 * API endpoints
 */
export const GENERATE_PDF_API = "/api/rfq/invoice/generate";
export const SEND_PDF_API = "/api/invoice/send";
export const EXPORT_INVOICE_API = "/api/rfq/invoice/export";

/**
 * Chromium for Puppeteer
 */
export const CHROMIUM_EXECUTABLE_PATH =
  "https://github.com/Sparticuz/chromium/releases/download/v122.0.0/chromium-v122.0.0-pack.tar";

/**
 * Tailwind
 */
export const TAILWIND_CDN =
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";

//invoice values

export const FORM_DEFAULT_VALUES = {
  receiver: {
    customerId: "",
    name: "",
    address: "",
    zip: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    customInputs: [],
  },
  details: {
    invoiceNumber: "",
    invoiceDate: "",
    rfqId: null,
    items: [
      {
        id: null,
        name: "",
        quantity: null,
        price: null,
        purchasePrice: null,
        total: 0,
      },
    ],
    currency: "INR",
    taxAmount: 0,
    discountAmount: 0,
    shippingAmount: 0,
    paymentInformation: {
      bankName: "",
      accountName: "",
      accountNumber: "",
      transactionId: "",
      ptc: "",
    },
    additionalNotes: "",
    subTotal: 0,
    totalAmount: 0,
    tc: "",
    totalAmountInWords: "",
  },
};

export const responsiveProductCarousel = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1900 },
    items: 6,
    slidesToSlide: 1,
  },

  desktop: {
    breakpoint: { max: 1900, min: 1370 },
    items: 5,
  },
  desktop1: {
    breakpoint: { max: 1900, min: 1370 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 785, min: 653 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 653, min: 464 },
    items: 2,
  },
  sm: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};
export const responsiveTestimonialsCarousel = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 800, min: 0 },
    items: 1,
  },
};
export const responsiveCategoriesCarousel = {
  desktop: {
    breakpoint: { max: 4000, min: 1370 },
    items: 6,
  },

  tablet: {
    breakpoint: { max: 1370, min: 464 },
    items: 5,
  },

  sm: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};
export const responsiveBrandsCarousel = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 2000 },
    items: 11,
    slidesToSlide: 1, // This can be customized as needed
  },
  largeDesktop: {
    breakpoint: { max: 2000, min: 1200 },
    items: 8,
  },

  tablet: {
    breakpoint: { max: 1200, min: 768 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 768, min: 480 },
    items: 5,
  },
  sm: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};
export const responsiveClienteleCarousel = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1200 },
    items: 7,
    slidesToSlide: 1, // This can be customized as needed
  },

  tablet: {
    breakpoint: { max: 1200, min: 768 },
    items: 6,
  },

  smallMobile: {
    breakpoint: { max: 768, min: 0 },
    items: 4,
  },
};

export function calculatePriceWithGST(discountedPrice, gstPercentage = 18) {
  const gstAmount = (discountedPrice * gstPercentage) / 100;
  const priceWithGST = discountedPrice + gstAmount;

  return {
    gstAmount,
    priceWithGST,
  };
}
