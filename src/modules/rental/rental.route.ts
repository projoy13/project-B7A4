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

// "id": "69f88a1b-f52e-484c-92b9-0a2746f27d90",
//         "customerId": "2c1fcf8a-a529-4f95-ace9-34279011c4f6",
  // "rentalOrderId": "69f88a1b-f52e-484c-92b9-0a2746f27d90",