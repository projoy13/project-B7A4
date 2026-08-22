import type { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../../utils/catch-async";
import { AppError } from "../../utils/app.error";
import { sendResponse } from "../../utils/send-response";

import { PaymentService } from "./payment.service";

const createPayment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PaymentService.createPayment(
      req.body
    );

    sendResponse(
      res,
      {
        message: "Payment created successfully",
        data: result,
      },
      httpStatus.CREATED
    );
  }
);

const getAllPayments = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PaymentService.getAllPayments();

    sendResponse(res, {
      message: "Payments retrieved successfully",
      data: result,
    });
  }
);

const getSinglePayment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const result =
      await PaymentService.getSinglePayment(id);

    if (!result) {
      throw new AppError(
        404,
        "Payment not found"
      );
    }

    sendResponse(res, {
      message: "Payment retrieved successfully",
      data: result,
    });
  }
);

const confirmPayment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const { status } = req.body;

    if (
      status !== "COMPLETED" &&
      status !== "FAILED"
    ) {
      throw new AppError(
        400,
        "Invalid payment status"
      );
    }

    const payment =
      await PaymentService.getSinglePayment(id);

    if (!payment) {
      throw new AppError(
        404,
        "Payment not found"
      );
    }

    const result =
      await PaymentService.confirmPayment(
        id,
        status
      );

    sendResponse(res, {
      message: "Payment status updated successfully",
      data: result,
    });
  }
);

export const PaymentController = {
  createPayment,
  getAllPayments,
  getSinglePayment,
  confirmPayment,
};