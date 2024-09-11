import { sub } from "date-fns";

export const StoreId = "667ec838d471b19705804a1e";
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
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};




