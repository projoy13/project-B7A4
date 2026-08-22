import { Router } from "express";
import { CategoryController } from "./category.controller";

export const categoryRouter = Router();

categoryRouter.post(
  "/",
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
  "/:id",
  CategoryController.updateCategory
);

categoryRouter.delete(
  "/:id",
  CategoryController.deleteCategory
);