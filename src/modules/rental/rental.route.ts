
import { Router } from "express";
import { RentalController } from "./rental.controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validate.request";
import {
  createRentalSchema,
  updateRentalStatusSchema,
} from "./rental.validation";

export const rentalRouter: Router = Router();

// 1. Create rental
rentalRouter.post(
  "/",
  auth("CUSTOMER"),
  validateRequest(createRentalSchema),
  RentalController.createRental
);

// 2. Get logged-in customer's rentals
rentalRouter.get(
  "/userRentals",
  auth("CUSTOMER"),
  RentalController.getMyrentals
);

// 3. Get all rentals
rentalRouter.get(
  "/",
  RentalController.getAllRentals
);

// 4. Update rental status
rentalRouter.patch(
  "/:id/status",
  auth("PROVIDER", "ADMIN"),
  validateRequest(updateRentalStatusSchema),
  RentalController.updateRentalStatus
);

// 5. Get provider orders
rentalRouter.get(
  "/provider/orders",
  auth("PROVIDER"),
  RentalController.getProviderOrders
);

// 6. Get single rental
rentalRouter.get(
  "/:id",
  RentalController.getSingleRental
);
