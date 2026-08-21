import type {
  NextFunction,
  Request,
  Response,
} from "express";

import httpStatus from "http-status";
import { catchAsync } from "../../utils/catch-async";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/send-response";

const registerUser = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = await authService.registerUser(req.body);

    sendResponse(
      res,
      {
        message: "User registered successfully",
        data: result,
      },
      httpStatus.CREATED
    );
  }
);

const loginUser = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const loginResult = await authService.loginUser(
      req.body
    );

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
  registerUser,
  loginUser,
};