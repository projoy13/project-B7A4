import { Router } from "express";
import { RentalController } from "./rental.controller";

export const rentalRouter = Router();

rentalRouter.post(
  "/",
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