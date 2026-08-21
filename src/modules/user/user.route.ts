import { Router } from "express";
import { getUsers } from "./user.controller";

const userRouter=Router()

userRouter.get("/",getUsers)
// userRouter.get("/:id" getuser)
// useRouter.get("/",adduser)
// useRouter.PATCH("/",adduser)
// userRouter.delete("/:id",removeUser)


// useRouter.get("/",auth("owner"),adduser)
// useRouter.PATCH("/",auth("owner"),adduser)
// userRouter.delete("/:id",auth("ADMIN","provider")removeUser)


