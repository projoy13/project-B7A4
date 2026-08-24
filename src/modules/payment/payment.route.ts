import { Router } from "express";

import { PaymentController } from "./payment.controller";

import { auth } from "../../middleware/auth";

import { validateRequest } from "../../middleware/validate.request";

import { paymentValidation } from "./payment.validation";

export const paymentRouter = Router();

// Create payment
paymentRouter.post(
  "/create",
  auth("CUSTOMER"),
  validateRequest(
    paymentValidation.createPaymentSchema
  ),
  PaymentController.createPayment
);

// Create Stripe checkout session
paymentRouter.post(
  "/checkout/:id",
  auth("CUSTOMER"),
  validateRequest(
    paymentValidation.paymentIdParamsSchema
  ),
  PaymentController.checkout
);

// Stripe webhook
// No authentication here.
// Stripe calls this endpoint.
paymentRouter.post(
  "/webhook",
  PaymentController.webhook
);

// Get all payments
paymentRouter.get(
  "/",
  auth("ADMIN"),
  PaymentController.getAllPayments
);

// Get single payment
paymentRouter.get(
  "/:id",
  auth("ADMIN"),
  validateRequest(
    paymentValidation.paymentIdParamsSchema
  ),
  PaymentController.getSinglePayment
);