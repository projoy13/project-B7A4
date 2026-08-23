import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";

const userRouter = Router();

userRouter.get(
  "/",auth("ADMIN"),
  userController.getUsers
);

userRouter.patch(
  "/:id",auth("ADMIN"),
  userController.updateUserStatus
);

export default userRouter;