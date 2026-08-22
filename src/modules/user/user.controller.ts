import type { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { userService } from "./user.service";

const getUsers = catchAsync(
  async (req: Request, res: Response) => {
    const users = await userService.getUsers();

    sendResponse(
      res,
      {
        message: "Users retrieved successfully",
        data: users,
      },
      httpStatus.OK
    );
  }
);

const updateUserStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const result = await userService.updateUserStatus(
      id,
      req.body
    );

    sendResponse(
      res,
      {
        message: "User status updated successfully",
        data: result,
      },
      httpStatus.OK
    );
  }
);

export const userController = {
  getUsers,
  updateUserStatus,
};