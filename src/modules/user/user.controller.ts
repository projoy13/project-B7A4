import prisma from "../../lib/prisma";
import { catchAsync } from "../../utils/catch-async";
import type { Request, Response } from "express";
import { sendResponse } from "../../utils/send-response";
import { UserStatus } from "../../../prisma/generated/prisma/enums";

export const getUsers = catchAsync(
  async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      where: {
        status: UserStatus.ACTIVE,
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    sendResponse(res, {
      message: "Users retrieved successfully",
      data: users,
    });
  }
);