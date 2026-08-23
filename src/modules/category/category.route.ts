import { Router } from "express";
import { CategoryController } from "./category.controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validate.request";

import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
} from "./category.validation";

export const categoryRouter = Router();

categoryRouter.post(
  "/",
  auth("ADMIN"),
  validateRequest(createCategorySchema),
  CategoryController.createCategory
);

categoryRouter.get(
  "/",
  CategoryController.getAllCategories
);

categoryRouter.get(
  "/:id",
  validateRequest(categoryIdSchema),
  CategoryController.getSingleCategory
);

categoryRouter.patch(
  "/:id",
  auth("ADMIN"),
  validateRequest(updateCategorySchema),
  CategoryController.updateCategory
);

categoryRouter.delete(
  "/:id",
  auth("ADMIN"),
  validateRequest(categoryIdSchema),
  CategoryController.deleteCategory
);