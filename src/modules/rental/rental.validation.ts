import { z } from "zod";

export const createRentalSchema = z.object({
  body: z.object({
    customerId: z
      .string()
      .uuid("Invalid customer ID"),

    startDate: z
      .string()
      .min(1, "Start date is required"),

    endDate: z
      .string()
      .min(1, "End date is required"),

    items: z
      .array(
        z.object({
          gearId: z
            .string()
            .uuid("Invalid gear ID"),

          quantity: z
            .number()
            .int("Quantity must be an integer")
            .positive("Quantity must be greater than 0"),
        })
      )
      .min(1, "At least one gear item is required"),
  }),
});
export const updateRentalStatusSchema = z.object({
  body: z.object({
    status: z.enum(
      [
        "PLACED",
        "CONFIRMED",
        "CANCELLED",
        "PAID",
        "PICKED_UP",
        "RETURNED",
      ],
      {
        message: "Invalid rental status",
      }
    ),
  }),
});