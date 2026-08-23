import { Router } from "express";
import { CategoryController } from "./category.controller";
import { auth } from "../../middleware/auth";

export const categoryRouter = Router();

categoryRouter.post(
  "/",auth("ADMIN"),
  CategoryController.createCategory
);

categoryRouter.get(
  "/",
  CategoryController.getAllCategories
);

categoryRouter.get(
  "/:id",
  CategoryController.getSingleCategory
);

categoryRouter.patch(
  "/:id",auth("ADMIN"),
  CategoryController.updateCategory
);

categoryRouter.delete(
  "/:id",auth("ADMIN"),
  CategoryController.deleteCategory
);