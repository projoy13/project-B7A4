import type { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../../utils/catch-async";
import { AppError } from "../../utils/app.error";
import { sendResponse } from "../../utils/send-response";

import { RentalService } from "./rental.service";

const createRental = catchAsync(
  async (req: Request, res: Response) => {
    const result = await RentalService.createRental(
      req.body
    );

    sendResponse(
      res,
      {
        message: "Rental order created successfully",
        data: result,
      },
      httpStatus.CREATED
    );
  }
);

const getAllRentals = catchAsync(
  async (req: Request, res: Response) => {
    const result = await RentalService.getAllRentals();

    sendResponse(res, {
      message: "Rental orders retrieved successfully",
      data: result,
    });
  }
);

const getSingleRental = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const result =
      await RentalService.getSingleRental(id);

    if (!result) {
      throw new AppError(
        404,
        "Rental order not found"
      );
    }

    sendResponse(res, {
      message: "Rental order retrieved successfully",
      data: result,
    });
  }
);
const updateRentalStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const result =
      await RentalService.updateRentalStatus(
        id,
        req.body
      );

    sendResponse(res, {
      message: "Rental status updated successfully",
      data: result,
    });
  }
);

export const RentalController = {
  createRental,
  getAllRentals,
  getSingleRental,
  updateRentalStatus
};