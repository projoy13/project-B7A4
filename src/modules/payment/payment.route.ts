import { Router } from "express";
import { PaymentController } from "./payment.controller";

export const paymentRouter = Router();

paymentRouter.post(
  "/create",
  PaymentController.createPayment
);

paymentRouter.post(
  "/confirm/:id",
  PaymentController.confirmPayment
);

paymentRouter.get(
  "/",
  PaymentController.getAllPayments
);

paymentRouter.get(
  "/:id",
  PaymentController.getSinglePayment
);