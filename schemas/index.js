import Products from "@/app/(client)/products/page";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters is required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const newPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 characters is required" }),
});

export const billboardSchema = z.object({
  title: z.string().min(3, { message: "title is required" }),
  description: z.string().min(3, { message: "description is required" }),
  action: z.string(),
  images: z.array(z.any()).min(1).max(1),
});

export const BrandSchema = z.object({
  name: z.string().min(3).max(25),
  images: z.array(z.any()).max(1),
});

export const CategorySchema = z.object({
  name: z.string().min(3).max(35),
  images: z.array(z.any()).max(1),
});

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  images: z.array(z.any()).min(1, "At least one image is required"),
  msp: z.number().min(0, "MSP must be a positive number"),
  mrp: z.number().min(0, "MRP must be a positive number"),
  brandId: z.string().min(1, "Category is required"),
  categoryId: z.string().min(1, "Category is required"),
  discount: z.coerce.number().optional(),
  features: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .optional(),
  description: z.string().optional(),
  gst: z
    .number()
    .min(0, "GST must be a positive number")
    .refine((value) => value === 18 || value > 0, {
      message: "GST must be either 18 or a positive number",
    })
    .default(18)
    .optional(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

export const OfferSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    discountPercentage: z
      .number()
      .min(0, "Discount percentage cannot be negative")
      .max(100, "Discount percentage cannot exceed 100"),
    validFrom: z.date(),
    validUntil: z
      .date()
      .refine(
        (date) => date > new Date(),
        "Valid until date must be in the future"
      ),
    productIds: z.array(z.string()).optional(),
    brandIds: z.array(z.string()).optional(),
    categoryIds: z.array(z.string()).optional(),
  })
  .superRefine(({ validFrom, validUntil }, ctx) => {
    if (validUntil <= validFrom) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valid until date must be after the start date",
        path: ["validUntil"], // Path to the field that has the issue
      });
    }
  });

export const StockInSchema = z.object({
  notes: z.string().optional(),
  products: z.array(
    z.object({
      id: z.string().min(1, "Product must be selected"), // Ensures productId is a non-empty string
      quantity: z
        .number()
        .int()
        .positive("Quantity must be a positive integer"),
      mrp: z.number().int().positive("mrp must be a positive integer"),
      msp: z.number().int().positive("msp must be a positive integer"),
      purchasePrice: z
        .number()
        .int()
        .positive("Purchase Price must be a positive integer"),
    })
  ),
});

export const TestimonialSchema = z.object({
  name: z.string(),
  organization: z.string().optional(), // optional field
  designation: z.string().optional(), // optional field
  images: z.array(z.any()).max(1), // optional field
  message: z.string(),
});

export const PostReviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().max(5),
  title: z.string().min(3),
  review: z.string().max(200),
  response: z.string().optional(),
});

export const shippingAddressSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zip: z.string().min(1, { message: "Zip code is required" }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .max(10, { message: "Phone number must not exceed 10 characters" }),
});

export const RfqSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .max(10, { message: "Phone number must not exceed 10 characters" }),
  images: z.array(z.any()).min(1), // optional field
  response: z.string().optional(),
  notes: z.string().optional(),
});

// Define date formatting options
const DATE_OPTIONS = { year: "numeric", month: "long", day: "numeric" };

// TODO: Refactor some of the validators. Ex: name and zipCode or address and country have same rules
// Field Validators
const fieldValidators = {
  name: z
    .string()
    .min(2, { message: "Must be at least 2 characters" })
    .max(50, { message: "Must be at most 50 characters" }),
  address: z
    .string()
    .min(2, { message: "Must be at least 2 characters" })
    .max(70, { message: "Must be between 2 and 70 characters" }),
  zipCode: z
    .string()
    .min(2, { message: "Must be between 2 and 20 characters" })
    .max(20, { message: "Must be between 2 and 20 characters" }),
  city: z
    .string()
    .min(1, { message: "Must be between 1 and 50 characters" })
    .max(50, { message: "Must be between 1 and 50 characters" }),
  country: z
    .string()
    .min(1, { message: "Must be between 1 and 70 characters" })
    .max(70, { message: "Must be between 1 and 70 characters" }),
  email: z
    .string()
    .email({ message: "Email must be a valid email" })
    .min(5, { message: "Must be between 5 and 30 characters" })
    .max(30, { message: "Must be between 5 and 30 characters" }),
  phone: z
    .string()
    .min(1, { message: "Must be between 1 and 50 characters" })
    .max(50, {
      message: "Must be between 1 and 50 characters",
    }),

  // Dates
  date: z
    .date()
    .transform((date) =>
      new Date(date).toLocaleDateString("en-US", DATE_OPTIONS)
    ),

  // Items
  quantity: z.coerce
    .number()
    .min(1, { message: "Must be a number greater than 0" }),
  unitPrice: z.coerce
    .number()
    .min(1, { message: "Must be a number greater than 0" }),

  // Strings
  string: z.string(),
  stringMin1: z.string().min(1, { message: "Must be at least 1 character" }),
  stringToNumber: z.coerce.number(),

  // Charges
  stringToNumberWithMax: z.coerce.number().max(1000000),

  stringOptional: z.string().optional(),

  nonNegativeNumber: z.coerce.number().nonnegative({
    message: "Must be a positive number",
  }),
  // ! This is unused
  numWithCommas: z.coerce
    .number()
    .nonnegative({
      message: "Must be a positive number",
    })
    .transform((value) => {
      return formatNumberWithCommas(value);
    }),
};

const CustomInputSchema = z.object({
  key: z.string(),
  value: z.string(),
});

const InvoiceReceiverSchema = z.object({
  customerId: fieldValidators.stringMin1,
  name: fieldValidators.name,
  address: fieldValidators.address,
  zip: fieldValidators.zipCode,
  city: fieldValidators.city,
  country: fieldValidators.country,
  email: fieldValidators.email,
  phone: fieldValidators.phone,
  customInputs: z.array(CustomInputSchema).optional(),
});

const ItemSchema = z.object({
  id: fieldValidators.stringMin1,
  name: fieldValidators.stringMin1,
  quantity: fieldValidators.quantity,
  purchasePrice: fieldValidators.unitPrice,
  price: fieldValidators.stringToNumberWithMax,
  total: fieldValidators.stringToNumber,
});

const PaymentInformationSchema = z.object({
  bankName: fieldValidators.stringOptional,
  accountName: fieldValidators.stringOptional,
  accountNumber: fieldValidators.stringOptional,
  transactionId: fieldValidators.stringOptional,
  ptc: fieldValidators.stringOptional,
});

const InvoiceDetailsSchema = z.object({
  invoiceNumber: fieldValidators.stringMin1,
  rfqId: fieldValidators.stringMin1,
  draftId: fieldValidators.stringOptional,
  invoiceDate: fieldValidators.date,
  items: z.array(ItemSchema),
  paymentInformation: PaymentInformationSchema.optional(),
  taxAmount: fieldValidators.stringToNumberWithMax,
  discountAmount: fieldValidators.stringToNumberWithMax,
  shippingAmount: fieldValidators.stringToNumberWithMax,
  subTotal: fieldValidators.nonNegativeNumber,
  totalAmount: fieldValidators.nonNegativeNumber,
  additionalNotes: fieldValidators.stringOptional,
  tc: fieldValidators.stringOptional,
});

const InvoiceSchema = z.object({
  receiver: InvoiceReceiverSchema,
  details: InvoiceDetailsSchema,
});

export { InvoiceSchema, ItemSchema };

//invoice schemas end
