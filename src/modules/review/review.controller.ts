import type {
  Request,
  Response,
} from "express";

import httpStatus from "http-status";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { ReviewService } from "./review.service";

const createReview = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await ReviewService.createReview(
        req.body
      );

    sendResponse(
      res,
      {
        message: "Review created successfully",
        data: result,
      },
      httpStatus.CREATED
    );
  }
);

const getAllReviews = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await ReviewService.getAllReviews();

    sendResponse(res, {
      message: "Reviews retrieved successfully",
      data: result,
    });
  }
);

const getReviewsByGear = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const { gearItemId } = req.params;

    const result =
      await ReviewService.getReviewsByGear(
        gearItemId as string
      );

    sendResponse(res, {
      message:
        "Gear reviews retrieved successfully",
      data: result,
    });
  }
);

const getSingleReview = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const { id } = req.params;

    const result =
      await ReviewService.getSingleReview(
        id as string
      );

    sendResponse(res, {
      message: "Review retrieved successfully",
      data: result,
    });
  }
);

const deleteReview = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const { id } = req.params;

    await ReviewService.deleteReview(
      id as string
    );

    sendResponse(
      res,
      {
        message: "Review deleted successfully",
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
  deleteReview,
};