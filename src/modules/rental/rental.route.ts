import { Router } from "express";
import { RentalController } from "./rental.controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validate.request";
import { createRentalSchema, updateRentalStatusSchema } from "./rental.validation";

export const rentalRouter = Router();

rentalRouter.post(
  "/",
  auth("CUSTOMER"),
  validateRequest(createRentalSchema),
  RentalController.createRental
);

rentalRouter.get(
  "/",
  RentalController.getAllRentals
);

rentalRouter.get(
  "/:id",
  RentalController.getSingleRental
);

rentalRouter.patch(
  "/:id/status",
  auth("PROVIDER", "ADMIN"),
  validateRequest(updateRentalStatusSchema),
  RentalController.updateRentalStatus
);