import type { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../../utils/catch-async";
import { AppError } from "../../utils/app.error";
import { sendResponse } from "../../utils/send-response";
import { CategoryService } from "./category.service";

const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.createCategory(req.body);

    sendResponse(
      res,
      {
        message: "Category created successfully",
        data: result,
      },
      httpStatus.CREATED
    );
  }
);

const getAllCategories = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategories();

    sendResponse(res, {
      message: "Categories retrieved successfully",
      data: result,
    });
  }
);

const getSingleCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params as {id:string};

    const result = await CategoryService.getSingleCategory(id);

    if (!result) {
      throw new AppError(404, "Category not found");
    }

    sendResponse(res, {
      message: "Category retrieved successfully",
      data: result,
    });
  }
);

const updateCategory = catchAsync(
  async (req: Request, res: Response) => {
     const { id } = req.params as {id:string}

    const category = await CategoryService.getSingleCategory(id);

    if (!category) {
      throw new AppError(404, "Category not found");
    }

    const result = await CategoryService.updateCategory(
      id,
      req.body
    );

    sendResponse(res, {
      message: "Category updated successfully",
      data: result,
    });
  }
);

const deleteCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params as {id:string}

    const category = await CategoryService.getSingleCategory(id);

    if (!category) {
      throw new AppError(404, "Category not found");
    }

    await CategoryService.deleteCategory(id);

    sendResponse(res, {
      message: "Category deleted successfully",
      data: null,
    });
  }
);

export const CategoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};