export const StoreId = "667ec838d471b19705804a1e";

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

export const EXPORT_INVOICE_API = "test";
export const SEND_PDF_API = "test";

//invoice values

export const FORM_DEFAULT_VALUES = {
  receiver: {
    name: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    customInputs: [],
  },
  details: {
    invoiceLogo: "",
    invoiceNumber: "",
    invoiceDate: "",
    items: [
      {
        name: "",
        description: "",
        quantity: 0,
        unitPrice: 0,
        total: 0,
      },
    ],
    currency: "INR",
    language: "English",
    taxDetails: {
      amount: 0,
      amountType: "amount",
      taxID: "",
    },
    discountDetails: {
      amount: 0,
      amountType: "amount",
    },
    shippingDetails: {
      cost: 0,
      costType: "amount",
    },
    paymentInformation: {
      bankName: "",
      accountName: "",
      accountNumber: "",
    },
    additionalNotes: "",
    paymentTerms: "",
    totalAmountInWords: "",
    pdfTemplate: 1,
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


export const generateInvoiceNumber = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Month is zero-based
  const year = today.getFullYear();

  return `PLUM-RFQ-${day}-${month}-${year}`;
};