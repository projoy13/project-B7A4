import { z } from "zod";

const createPaymentSchema = z.object({
  body: z.object({
    rentalOrderId: z
      .string()
      .uuid("Invalid rental order ID"),
  }),
});

const paymentIdParamsSchema = z.object({
  params: z.object({
    id: z
      .string()
      .uuid("Invalid payment ID"),
  }),
});

export const paymentValidation = {
  createPaymentSchema,
  paymentIdParamsSchema,
};