import { z } from "zod";

export const createGearSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Name is required"),

    description: z
      .string()
      .optional(),

    brand: z
      .string()
      .optional(),

    pricePerDay: z
      .number()
      .positive("Price per day must be greater than 0"),

    stock: z
      .number()
      .int("Stock must be an integer")
      .nonnegative("Stock cannot be negative")
      .optional(),

    image: z
      .string()
      .url("Invalid image URL")
      .optional(),

    providerId: z
      .string()
      .uuid("Invalid provider ID"),

    categoryId: z
      .string()
      .uuid("Invalid category ID"),
  }),
});
export const updateGearSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Name cannot be empty")
      .optional(),

    description: z
      .string()
      .optional(),

    brand: z
      .string()
      .optional(),

    pricePerDay: z
      .number()
      .positive("Price per day must be greater than 0")
      .optional(),

    stock: z
      .number()
      .int("Stock must be an integer")
      .nonnegative("Stock cannot be negative")
      .optional(),

    image: z
      .string()
      .url("Invalid image URL")
      .optional(),

    categoryId: z
      .string()
      .uuid("Invalid category ID")
      .optional(),
  }),

  params: z.object({
    id: z.string().uuid("Invalid gear ID"),
  }),
});
export const gearIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid gear ID"),
  }),
});