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
  label: z.string().min(3, { message: "Label is required" }),
  imageUrl: z.string().url(),
  brand: z.string().min(1),
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
  // images: z.any().refine((value) => value instanceof File, {
  //   message: "Must be a File object",
  // }),
  price: z.number().min(0, "Price must be a positive number"),

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

  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

export const StockInSchema = z.object({
  notes: z.string().optional(),
  products: z.array(
    z.object({
      productId: z.string().min(1, "Product must be selected"), // Ensures productId is a non-empty string
      quantity: z
        .number()
        .int()
        .positive("Quantity must be a positive integer"),
      price: z.number().int().positive("Price must be a positive integer"),
      purchasePrice: z
        .number()
        .int()
        .positive("Purchase Price must be a positive integer"),
    })
  ),
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
  images: z.object({ url: z.string() }).array().min(1),
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
  name: fieldValidators.stringMin1,
  quantity: fieldValidators.quantity,
  purchasePrice: fieldValidators.unitPrice,
  unitPrice: fieldValidators.unitPrice,
  total: fieldValidators.stringToNumber,
});

const PaymentInformationSchema = z.object({
  bankName: fieldValidators.stringOptional,
  accountName: fieldValidators.stringOptional,
  accountNumber: fieldValidators.stringOptional,
  transactionId: fieldValidators.stringOptional,
});

const DiscountDetailsSchema = z.object({
  amount: fieldValidators.stringToNumberWithMax,
  amountType: fieldValidators.string,
});

const TaxDetailsSchema = z.object({
  amount: fieldValidators.stringToNumberWithMax,
  taxID: fieldValidators.string,
  amountType: fieldValidators.string,
});

const ShippingDetailsSchema = z.object({
  cost: fieldValidators.stringToNumberWithMax,
  costType: fieldValidators.string,
});

const InvoiceDetailsSchema = z.object({
  invoiceNumber: fieldValidators.stringMin1,
  invoiceDate: fieldValidators.date,
  purchaseOrderNumber: fieldValidators.stringOptional,
  items: z.array(ItemSchema),
  paymentInformation: PaymentInformationSchema.optional(),
  taxDetails: TaxDetailsSchema.optional(),
  discountDetails: DiscountDetailsSchema.optional(),
  shippingDetails: ShippingDetailsSchema.optional(),
  subTotal: fieldValidators.nonNegativeNumber,
  totalAmount: fieldValidators.nonNegativeNumber,
  totalAmountInWords: fieldValidators.string,
  additionalNotes: fieldValidators.stringOptional,
  updatedAt: fieldValidators.stringOptional,
  pdfTemplate: z.number(),
});

const InvoiceSchema = z.object({
  receiver: InvoiceReceiverSchema,
  details: InvoiceDetailsSchema,
});

export { InvoiceSchema, ItemSchema };

//invoice schemas end
