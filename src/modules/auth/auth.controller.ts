import type {
  NextFunction,
  Request,
  Response,
} from "express";

import httpStatus from "http-status";
import { catchAsync } from "../../utils/catch-async";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/send-response";

const loginUser = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const payload = req.body;

    const loginResult = await authService.loginUser(payload);

    sendResponse(
      res,
      {
        message: "User logged in successfully",
        data: loginResult,
      },
      httpStatus.OK
    );
  }
);

export const authController = {
  loginUser,
};