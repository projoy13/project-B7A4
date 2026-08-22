import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app.error";
import type { ICreatePayment } from "./payment.interface";

const createPayment = async (
  payload: ICreatePayment
) => {
  const {
    rentalOrderId,
    transactionId,
    amount,
    method,
  } = payload;

  // Check rental order exists
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

  // Check if payment already exists
  const existingPayment =
    await prisma.payment.findUnique({
      where: {
        rentalOrderId,
      },
    });

  if (existingPayment) {
    throw new AppError(
      409,
      "Payment already exists for this rental order"
    );
  }

  // Optional: check amount matches rental total
  if (
    Number(amount) !==
    Number(rentalOrder.totalAmount)
  ) {
    throw new AppError(
      400,
      "Payment amount does not match rental total"
    );
  }

  const result = await prisma.payment.create({
    data: {
      rentalOrderId,
      transactionId,
      amount,
      method,
    },
  });

  return result;
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

const confirmPayment = async (
  id: string,
  status: "COMPLETED" | "FAILED"
) => {
  const payment =
    await prisma.payment.findUnique({
      where: {
        id,
      },
    });

  if (!payment) {
    throw new AppError(
      404,
      "Payment not found"
    );
  }

  const result =
    await prisma.$transaction(
      async (tx) => {
        const updatedPayment =
          await tx.payment.update({
            where: {
              id,
            },
            data: {
              status,
              paidAt:
                status === "COMPLETED"
                  ? new Date()
                  : null,
            },
          });

        // If payment is completed,
        // update rental order status
        if (status === "COMPLETED") {
          await tx.rentalOrder.update({
            where: {
              id: payment.rentalOrderId,
            },
            data: {
              status: "PAID",
            },
          });
        }

        return updatedPayment;
      }
    );

  return result;
};

export const PaymentService = {
  createPayment,
  getAllPayments,
  getSinglePayment,
  confirmPayment,
};