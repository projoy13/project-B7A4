import { Router } from "express";
import { RentalController } from "./rental.controller";
import { auth } from "../../middleware/auth";

export const rentalRouter = Router();

rentalRouter.post(
  "/",auth("CUSTOMER"),
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