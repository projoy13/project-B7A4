
import type { Response } from "express";

export function sendResponse<T>(
  res: Response,
  {
    success,
    message,
    data,
    error,
  }: {
    success: boolean;
    message: string;
    data?: T;
    error?: boolean;
  },
  status = 200
) {
  res.status(status).json({
    success,
    message,
    data: error ? undefined : data,
  });
}
