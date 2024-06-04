import { z } from "zod";

export const ShippingAddressSchema = z.object({
  streetAddress: z.string().min(2, {
    message: "Street Address is required.",
  }),
  city: z.string().min(2, {
    message: "City is required.",
  }),
  state: z.string().min(2, {
    message: "State is required.",
  }),
  zipCode: z.preprocess(
    (val) => parseInt(val as string),
    z.number().positive().min(1, {
      message: "zipCode is required.",
    })
  ),
  country: z.string().min(2, {
    message: "Country is required.",
  }),
  email: z.string({
    message: "Email is required.",
  }),
  fullName: z.string().min(2, {
    message: "Full name is required.",
  }),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, {
      message: "Cureent Password is required",
    }),
    password: z.string().min(6, {
      message: "New Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Not matched !",
      path: ["confirmPassword"],
    }
  );
export const changeNameEmailSchema = z.object({
  name: z.string().min(3, {
    message: "Full name is required",
  }),

  email: z.string().email({
    message: "Email is required",
  }),
});
export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
export const registerSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const addProductSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().positive().min(1, {
      message: "Price must be a positive number",
    })
  ),
  slug: z.string().min(1, {
    message: "Slug is required",
  }),
  sku: z.preprocess(
    (val) => parseInt(val as string),
    z.number().positive().min(1, {
      message: "SKU must be a positive number",
    })
  ),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  quantity: z.preprocess(
    (val) => parseInt(val as string),
    z.number().positive().min(1, {
      message: "Quantity must be a positive number",
    })
  ),
  images: z.object({ url: z.string() }).array().min(1, {
    message: "Image is required",
  }),
  colors: z.object({ hexCode: z.string() }).array().min(1, {
    message: "Color is required",
  }),
  categories: z.object({ category: z.string() }).array().min(1, {
    message: "Category is required",
  }),
  sizes: z.object({ size: z.string() }).array().min(1, {
    message: "Size is required",
  }),
});
