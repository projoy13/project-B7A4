import { Router } from "express";
import { getUsers } from "./user.controller";

const userRouter = Router();

userRouter.post("/register", getUsers);

export default userRouter;