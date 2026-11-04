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
  "/",
  auth("PROVIDER"),
  validateRequest(createGearSchema),
  GearController.createGearItem
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
  auth("PROVIDER","ADMIN"),
  validateRequest(gearIdSchema),
  GearController.deleteGearItem
);