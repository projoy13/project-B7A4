import { Router } from "express";
import { GearController } from "./gear.controller";
import { auth } from "../../middleware/auth";
// import auth from "../../middleware/auth";

export const gearRouter = Router();

// Create gear item
// gearRouter.post("/",auth("PROVIDER"), GearController.createGearItem);
gearRouter.post("/",auth("PROVIDER"), GearController.createGearItem);

// Get all gear items
gearRouter.get("/",auth(),GearController.getAllGearItems);

// Get single gear item
// gearRouter.get("/:id",auth("PROVIDER"), GearController.getSingleGearItem);
gearRouter.get("/:id",auth(), GearController.getSingleGearItem);

// Update gear item
gearRouter.patch("/:id",auth("PROVIDER"), GearController.updateGearItem);
// gearRouter.patch("/:id",auth("PROVIDER"), GearController.updateGearItem);

// Delete gear item
// gearRouter.delete("/:id", auth("PROVIDER"), GearController.deleteGearItem);
gearRouter.delete("/:id",auth("PROVIDER"), GearController.deleteGearItem);