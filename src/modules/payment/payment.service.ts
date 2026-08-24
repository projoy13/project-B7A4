import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app.error";

import { stripe } from "../../lib/stripe";

import type Stripe from "stripe";

const createPayment = async (
  userId: string,
  rentalOrderId: string
) => {
  const rentalOrder =
    await prisma.rentalOrder.findUnique({
      where: {
        id: rentalOrderId,
      },
    });

  if (!rentalOrder) {
    throw new AppError(
      404,
      "Rental order not found"
    );
  }

  console.log(
    "Rental customer ID:",
    rentalOrder.customerId
  );

  console.log(
    "Logged-in user ID:",
    userId
  );

  // Make sure customer owns this rental
  if (rentalOrder.customerId !== userId) {
    throw new AppError(
      403,
      "You are not authorized to pay for this rental order"
    );
  }

  // Check existing payment
  const existingPayment =
    await prisma.payment.findUnique({
      where: {
        rentalOrderId,
      },
    });

  if (existingPayment) {
    if (
      existingPayment.status ===
      "COMPLETED"
    ) {
      throw new AppError(
        409,
        "This rental order is already paid"
      );
    }

    return existingPayment;
  }

  const payment =
    await prisma.payment.create({
      data: {
        rentalOrderId,
        transactionId: `pending_${Date.now()}`,
        amount: rentalOrder.totalAmount,
        method: "STRIPE",
        provider: "STRIPE",
        status: "PENDING",
      },
    });

  return payment;
};

const createCheckoutSession = async (
  userId: string,
  paymentId: string
) => {
  const payment =
    await prisma.payment.findUnique({
      where: {
        id: paymentId,
      },
      include: {
        rentalOrder: true,
      },
    });

  if (!payment) {
    throw new AppError(
      404,
      "Payment not found"
    );
  }

  // Check ownership
  if (
    payment.rentalOrder.customerId !==
    userId
  ) {
    throw new AppError(
      403,
      "You are not authorized to pay for this order"
    );
  }

  if (
    payment.status === "COMPLETED"
  ) {
    throw new AppError(
      409,
      "Payment is already completed"
    );
  }

  const session =
    await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      metadata: {
        paymentId: payment.id,
        rentalOrderId:
          payment.rentalOrderId,
      },

      success_url:
        "http://localhost:5000/payment/success",

      cancel_url:
        "http://localhost:5000/payment/cancel",

      line_items: [
        {
          quantity: 1,

          price_data: {
            currency: "usd",

            product_data: {
              name: `Rental Order ${payment.rentalOrderId}`,
            },

            unit_amount: Math.round(
              Number(payment.amount) * 100
            ),
          },
        },
      ],
    });

  await prisma.payment.update({
    where: {
      id: payment.id,
    },

    data: {
      transactionId: session.id,
    },
  });

  return {
    sessionId: session.id,
    checkoutUrl: session.url,
  };
};

const getAllPayments = async () => {
  const result =
    await prisma.payment.findMany({
      include: {
        rentalOrder: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return result;
};

const getSinglePayment = async (
  id: string
) => {
  const result =
    await prisma.payment.findUnique({
      where: {
        id,
      },

      include: {
        rentalOrder: true,
      },
    });

  if (!result) {
    throw new AppError(
      404,
      "Payment not found"
    );
  }

  return result;
};

// Handle Stripe webhook
const handleStripeWebhook = async (
  event: Stripe.Event
) => {
  if (
    event.type ===
    "checkout.session.completed"
  ) {
    const session =
      event.data.object as Stripe.Checkout.Session;

    const paymentId =
      session.metadata?.paymentId;

    if (!paymentId) {
      throw new AppError(
        400,
        "Payment ID missing from Stripe metadata"
      );
    }

    const payment =
      await prisma.payment.findUnique({
        where: {
          id: paymentId,
        },
      });

    if (!payment) {
      throw new AppError(
        404,
        "Payment not found"
      );
    }

    await prisma.$transaction(
      async (tx) => {
        // Update payment
        await tx.payment.update({
          where: {
            id: paymentId,
          },

          data: {
            status: "COMPLETED",

            transactionId:
              session.payment_intent?.toString() ||
              session.id,

            paidAt: new Date(),
          },
        });

        // Update rental order
        await tx.rentalOrder.update({
          where: {
            id: payment.rentalOrderId,
          },

          data: {
            status: "PAID",
          },
        });
      }
    );
  }

  return true;
};

export const PaymentService = {
  createPayment,
  createCheckoutSession,
  getAllPayments,
  getSinglePayment,
  handleStripeWebhook,
};