import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Category name is required")
      .min(2, "Category name must be at least 2 characters"),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Category name must be at least 2 characters")
      .optional(),
  }),

  params: z.object({
    id: z.string().uuid("Invalid category ID"),
  }),
});

export const categoryIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid category ID"),
  }),
});