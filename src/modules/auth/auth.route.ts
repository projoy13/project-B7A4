
import { Router } from "express";
import { authController } from "./auth.controller";
import { registerSchema, loginSchema } from "./auth.validation";
import { validateRequest } from "../../middleware/validate.request";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.registerUser
);

router.post(
  "/login",
  validateRequest(loginSchema),
  authController.loginUser
);

router.post(
  "/refresh-token",
  authController.refreshToken
);

export const authRoutes:Router = router;
