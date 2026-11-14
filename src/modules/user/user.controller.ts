import type { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { userService } from "./user.service";
import { AppError } from "../../utils/app.error";

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUsers(req.query);

  sendResponse(res, {
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

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
         success:true,
        message: "User status updated successfully",
        data: result,
      },
      httpStatus.OK
    );
  }
);
const getMe = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if(!userId){
      throw new AppError(401,"user not authinticated")
    }

    const user = await userService.getMe(userId!);

    sendResponse(
      res,
      {
         success:true,
        message: "User retrieved successfully",
        data: user,
      },
      httpStatus.OK
    );
  }
);

export const userController = {
  getUsers,
  updateUserStatus,
  getMe
};