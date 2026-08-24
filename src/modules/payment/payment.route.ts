import { Router } from "express";

import { PaymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validate.request";
import { paymentValidation } from "./payment.validation";

export const paymentRouter = Router();


paymentRouter.post(
  "/create",
  auth("CUSTOMER"),
  validateRequest(
    paymentValidation.createPaymentSchema
  ),
  PaymentController.createPayment
);


paymentRouter.post(
  "/checkout/:id",
  auth("CUSTOMER"),
  validateRequest(
    paymentValidation.paymentIdParamsSchema
  ),
  PaymentController.checkout
);


paymentRouter.get(
  "/",
  auth("ADMIN"),
  PaymentController.getAllPayments
);


paymentRouter.get(
  "/:id",
  auth("ADMIN"),
  validateRequest(
    paymentValidation.paymentIdParamsSchema
  ),
  PaymentController.getSinglePayment
);