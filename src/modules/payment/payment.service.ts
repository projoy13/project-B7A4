import prisma from "../../lib/prisma";
import type { ICreatePayment } from "./payment.interface";
// import type { ICreatePayment } from "./payment.interface";

const createPayment = async (payload: ICreatePayment) => {
  const result = await prisma.payment.create({
    data: {
      rentalOrderId: payload.rentalOrderId,
      transactionId: payload.transactionId,
      amount: payload.amount,
      method: payload.method,
    },
  });

  return result;
};

const getAllPayments = async () => {
  const result = await prisma.payment.findMany({
    include: {
      rentalOrder: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getSinglePayment = async (id: string) => {
  const result = await prisma.payment.findUnique({
    where: {
      id,
    },
    include: {
      rentalOrder: true,
    },
  });

  return result;
};

const confirmPayment = async (
  id: string,
  status: "COMPLETED" | "FAILED"
) => {
  const result = await prisma.payment.update({
    where: {
      id,
    },
    data: {
      status,
      paidAt: status === "COMPLETED" ? new Date() : null,
    },
  });

  return result;
};

export const PaymentService = {
  createPayment,
  getAllPayments,
  getSinglePayment,
  confirmPayment,
};