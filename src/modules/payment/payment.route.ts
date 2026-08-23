import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";

export const paymentRouter = Router();

paymentRouter.post(
  "/create",auth("COUSTOMER"),
  PaymentController.createPayment
);

paymentRouter.patch(
  "/confirm/:id",auth("ADMIN"),
  PaymentController.confirmPayment
);

paymentRouter.get(
  "/",auth("ADMIN"),
  PaymentController.getAllPayments
);

paymentRouter.get(
  "/:id",auth("ADMIN"),
  PaymentController.getSinglePayment
);