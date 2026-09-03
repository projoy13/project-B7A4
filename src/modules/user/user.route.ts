import { Router } from "express";

import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validate.request";
import { updateUserStatusSchema } from "./user.validation";
// import { updateUserStatusSchema } from "./user.validation";

const userRouter = Router();

userRouter.get(
  "/",
  auth("ADMIN"),
  userController.getUsers
);

userRouter.patch(
  "/:id",
  auth("ADMIN"),
  validateRequest(updateUserStatusSchema),
  userController.updateUserStatus
);

userRouter.get(
  "/me",
  auth("CUSTOMER", "PROVIDER", "ADMIN"),
  userController.getMe
);

export default userRouter;