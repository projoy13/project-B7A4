import type { Request, Response } from "express";
import Stripe from "stripe";
import httpStatus from "http-status";

import { catchAsync } from "../../utils/catch-async";
import { AppError } from "../../utils/app.error";
import { sendResponse } from "../../utils/send-response";
import config from "../../config";
import { PaymentService } from "./payment.service";
import { stripe } from "../../lib/stripe";

const createPayment = catchAsync(
  async (req: Request, res: Response) => {
    const { rentalOrderId } = req.body;

    const result = await PaymentService.createPayment(
      req.user!.id,
      rentalOrderId
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

const checkout = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const result =
      await PaymentService.createCheckoutSession(
        req.user!.id,
        id
      );

    sendResponse(res, {
      message:
        "Stripe checkout session created successfully",
      data: result,
    });
  }
);

const getAllPayments = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await PaymentService.getAllPayments();

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

    sendResponse(res, {
      message: "Payment retrieved successfully",
      data: result,
    });
  }
);

const webhook = async (
  req: Request,
  res: Response
) => {
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    throw new AppError(
      400,
      "Missing Stripe signature"
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      config.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    throw new AppError(
      400,
      "Invalid webhook signature"
    );
  }

  await PaymentService.handleStripeWebhook(event);

  res.status(httpStatus.OK).json({
    received: true,
  });
};

export const PaymentController = {
  createPayment,
  checkout,
  getAllPayments,
  getSinglePayment,
  webhook,
};