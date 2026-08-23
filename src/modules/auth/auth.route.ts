import { Router } from "express";
import { z } from "zod";

import { authController } from "./auth.controller";
// import { validateRequest } from "../../middleware/validate-request";
import {
  registerSchema,
  loginSchema,
} from "./auth.validation";
import { validateRequest } from "../../middleware/validate.request";

const router = Router();

router.post(
  "/register",
  validateRequest(
    registerSchema.extend({
      params: z.record(z.string(), z.string()),
      query: z.record(z.string(), z.unknown()),
    })
  ),
  authController.registerUser
);

router.post(
  "/login",
  validateRequest(
    loginSchema.extend({
      params: z.record(z.string(), z.string()),
      query: z.record(z.string(), z.unknown()),
    })
  ),
  authController.loginUser
);

export const authRoutes = router;