import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app.error";
import { Prisma } from "../../prisma/generated/prisma/client";
import config from "../config";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorDetails: unknown = null;

  // Zod validation error
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error";
    errorDetails = err.issues;
  }

  // Custom AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorDetails = err.errorDetails ?? null;
  }

  // Prisma database errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        message = "This record already exists";
        break;

      case "P2003":
        statusCode = 400;
        message = "Invalid related record";
        break;

      case "P2012":
        statusCode = 400;
        message = "A required value is missing";
        break;

      case "P2018":
        statusCode = 404;
        message = "Related record not found";
        break;

      case "P2025":
        statusCode = 404;
        message = "Record not found";
        break;

      default:
        statusCode = 500;
        message = "Database error";
    }

    errorDetails = {
      code: err.code,
      meta: err.meta,
    };
  }

  // Normal JavaScript Error
  else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;

    if (config.NODE_ENV !== "production") {
      errorDetails = {
        stack: err.stack,
      };
    }
  }

  // Hide details for 500 errors in production
  if (statusCode === 500 && config.NODE_ENV === "production") {
    errorDetails = null;
  }

  // Send response ONLY ONCE
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorDetails,
  });
};






// intall zod
// what is zod ?:input validation
// npm i zod