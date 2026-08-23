import type {
  Request,
  Response,
} from "express";

import httpStatus from "http-status";

import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";

import { ReviewService } from "./review.service";


// ===============================
// CREATE REVIEW
// ===============================

const createReview = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await ReviewService.createReview(
        req.user!.id,
        req.body
      );

    sendResponse(
      res,
      {
        message:
          "Review created successfully",
        data: result,
      },
      httpStatus.CREATED
    );
  }
);


// ===============================
// GET ALL REVIEWS
// ===============================

const getAllReviews = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await ReviewService.getAllReviews();

    sendResponse(res, {
      message:
        "Reviews retrieved successfully",
      data: result,
    });
  }
);


// ===============================
// GET REVIEWS BY GEAR
// ===============================

const getReviewsByGear = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const { gearItemId } =
      req.params as {
        gearItemId: string;
      };

    const result =
      await ReviewService.getReviewsByGear(
        gearItemId
      );

    sendResponse(res, {
      message:
        "Gear reviews retrieved successfully",
      data: result,
    });
  }
);


// ===============================
// GET SINGLE REVIEW
// ===============================

const getSingleReview = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const { id } =
      req.params as {
        id: string;
      };

    const result =
      await ReviewService.getSingleReview(
        id
      );

    sendResponse(res, {
      message:
        "Review retrieved successfully",
      data: result,
    });
  }
);


// ===============================
// UPDATE REVIEW
// ===============================

const updateReview = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const { id } =
      req.params as {
        id: string;
      };

    const result =
      await ReviewService.updateReview(
        id,
        req.user!.id,
        req.body
      );

    sendResponse(res, {
      message:
        "Review updated successfully",
      data: result,
    });
  }
);


// ===============================
// DELETE REVIEW
// ===============================

const deleteReview = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const { id } =
      req.params as {
        id: string;
      };

    await ReviewService.deleteReview(
      id,
      req.user!.id,
      req.user!.role
    );

    sendResponse(
      res,
      {
        message:
          "Review deleted successfully",
        data: null,
      },
      httpStatus.OK
    );
  }
);


export const ReviewController = {
  createReview,
  getAllReviews,
  getReviewsByGear,
  getSingleReview,
  updateReview,
  deleteReview,
};