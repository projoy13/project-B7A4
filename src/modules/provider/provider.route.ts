import { Router } from "express";
import { auth } from "../../middleware/auth";
import { providerController } from "./provider.controller";

export const providerRouter:Router=Router()

providerRouter.get('/dashboard',auth("PROVIDER","ADMIN"),
 providerController.getDashboardStatus
)