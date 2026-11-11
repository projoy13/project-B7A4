import { Router } from "express";

import { GearController } from "./gear.controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validate.request";

import {
  createGearSchema,
  updateGearSchema,
  gearIdSchema,
} from "./gear.validation";

export const gearRouter: Router = Router();

// Create gear item
gearRouter.post(
  "/creat",
  auth("PROVIDER"),
  validateRequest(createGearSchema),
  GearController.createGearItem
);

// Get my gear - must be before /:id
gearRouter.get(
  "/mygear",
  auth("PROVIDER"),
  GearController.getMyGear
);

// Get all gear items
gearRouter.get(
  "/",
  GearController.getAllGearItems
);

// Get single gear item
gearRouter.get(
  "/:id",
  validateRequest(gearIdSchema),
  GearController.getSingleGearItem
);

// Update gear item
gearRouter.patch(
  "/:id",
  auth("PROVIDER"),
  validateRequest(updateGearSchema),
  GearController.updateGearItem
);

// Delete gear item
gearRouter.delete(
  "/:id",
  auth("PROVIDER", "ADMIN"),
  validateRequest(gearIdSchema),
  GearController.deleteGearItem
);