import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "email is required" }),
  password: z.string().min(1, { message: "password is required" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "email is required" }),
  password: z.string().min(6, { message: "minimum 6 characters is required" }),
  name: z.string().min(1, { message: "name is required" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "email is required" }),
});

export const newPasswordSchema = z.object({
  password: z.string().min(6, { message: "minimum 6 characters is required" }),
});

export const billboardSchema = z.object({
  action: z.string(),
  images: z.array(z.any()).min(1).max(1),
});

export const BrandSchema = z.object({
  name: z.string().max(25),
  images: z.array(z.any()).max(1),
});

export const CategorySchema = z.object({
  name: z.string().max(35),
  images: z.array(z.any()).max(1),
});

export const clienteleSchema = z.object({
  name: z.string().max(50),
  images: z.array(z.any()).max(1),
});

export const ProductSchema = z.object({
  name: z.string().min(1, "name is required"),
  images: z.array(z.any()).min(1, "at least one image is required"),
  msp: z.number().min(0, "MSP must be a positive number"),
  mrp: z.number().min(0, "MRP must be a positive number"),
  brandId: z.string().min(1, "category is required"),
  categoryId: z.string().min(1, "category is required"),
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
    .default(18)
    .optional(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

export const OfferSchema = z
  .object({
    title: z.string().min(1, "title is required"),
    description: z.string().min(1, "description is required"),
    discountPercentage: z
      .number()
      .min(0, "discount percentage cannot be negative")
      .max(100, "discount percentage cannot exceed 100"),
    validFrom: z.date(),
    validUntil: z
      .date()
      .refine(
        (date) => date > new Date(),
        "valid until date must be in the future"
      ),
    productIds: z.array(z.string()).optional(),
    brandIds: z.array(z.string()).optional(),
    categoryIds: z.array(z.string()).optional(),
  })
  .superRefine(({ validFrom, validUntil }, ctx) => {
    if (validUntil <= validFrom) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "valid until date must be after the start date",
        path: ["validUntil"], // Path to the field that has the issue
      });
    }
  });

export const StockInSchema = z.object({
  notes: z.string().optional(),
  products: z.array(
    z.object({
      productId: z.string().min(1, "product must be selected"), // Ensures productId is a non-empty string
      quantity: z
        .number()
        .int()
        .positive("quantity must be a positive integer"),
      mrp: z.number().int().positive("mrp must be a positive integer"),
      msp: z.number().int().positive("msp must be a positive integer"),
      purchasePrice: z
        .number()
        .int()
        .positive("purchase price must be a positive integer"),
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
  address: z.string().min(1, { message: "address is required" }),
  city: z.string().min(1, { message: "city is required" }),
  state: z.string().min(1, { message: "state is required" }),
  zip: z.string().min(1, { message: "zip code is required" }),
  phone: z
    .string()
    .min(1, { message: "phone number is required" })
    .max(10, { message: "phone number must not exceed 10 characters" }),
});

export const RfqSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "phone number is required" })
    .max(10, { message: "phone number must not exceed 10 characters" }),
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
    .min(2, { message: "must be at least 2 characters" })
    .max(50, { message: "must be at most 50 characters" }),
  address: z
    .string()
    .min(2, { message: "must be at least 2 characters" })
    .max(70, { message: "must be between 2 and 70 characters" }),
  zipCode: z
    .string()
    .min(2, { message: "must be between 2 and 20 characters" })
    .max(20, { message: "must be between 2 and 20 characters" }),
  city: z
    .string()
    .min(1, { message: "must be between 1 and 50 characters" })
    .max(50, { message: "must be between 1 and 50 characters" }),
  country: z
    .string()
    .min(1, { message: "must be between 1 and 70 characters" })
    .max(70, { message: "must be between 1 and 70 characters" }),
  email: z
    .string()
    .email({ message: "email must be a valid email" })
    .min(5, { message: "must be between 5 and 30 characters" })
    .max(30, { message: "must be between 5 and 30 characters" }),
  phone: z
    .string()
    .min(1, { message: "must be between 1 and 50 characters" })
    .max(50, {
      message: "must be between 1 and 50 characters",
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
    .min(1, { message: "must be a number greater than 0" }),
  unitPrice: z.coerce
    .number()
    .min(1, { message: "must be a number greater than 0" }),

  // Strings
  string: z.string(),
  stringMin1: z.string().min(1, { message: "must be at least 1 character" }),
  stringToNumber: z.coerce.number(),

  // Charges
  stringToNumberWithMax: z.coerce.number().max(1000000),

  stringOptional: z.string().optional(),

  nonNegativeNumber: z.coerce.number().nonnegative({
    message: "must be a positive number",
  }),
  // ! This is unused
  numWithCommas: z.coerce
    .number()
    .nonnegative({
      message: "must be a positive number",
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
  msp: fieldValidators.stringToNumberWithMax,
  total: fieldValidators.stringToNumber,
});

const InvoiceDetailsSchema = z.object({
  invoiceNumber: fieldValidators.stringMin1,
  rfqId: fieldValidators.stringMin1,
  draftId: fieldValidators.stringOptional,
  invoiceDate: fieldValidators.date,
  dueDate: fieldValidators.date,
  items: z.array(ItemSchema),
  taxAmount: fieldValidators.stringToNumberWithMax,
  discountAmount: fieldValidators.stringToNumberWithMax,
  shippingAmount: fieldValidators.stringToNumberWithMax,
  subTotal: fieldValidators.nonNegativeNumber,
  totalAmount: fieldValidators.nonNegativeNumber,
  additionalNotes: fieldValidators.stringOptional,
  tc: fieldValidators.stringOptional,
  pc: fieldValidators.stringOptional,
});

const InvoiceSchema = z.object({
  receiver: InvoiceReceiverSchema,
  details: InvoiceDetailsSchema,
});

export { InvoiceSchema, ItemSchema };

//invoice schemas end
