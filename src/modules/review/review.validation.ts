import { z } from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    rating: z
      .number()
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be greater than 5"),

    comment: z
      .string()
      .trim()
      .max(500, "Comment cannot exceed 500 characters")
      .optional(),

    gearItemId: z
      .string()
      .uuid("Invalid gear item ID"),
  }),
});

export const updateReviewSchema = z.object({
  body: z.object({
    rating: z
      .number()
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be greater than 5")
      .optional(),

    comment: z
      .string()
      .trim()
      .max(500, "Comment cannot exceed 500 characters")
      .optional(),
  }),
});