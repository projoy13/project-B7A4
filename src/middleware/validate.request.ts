
import type { RequestHandler } from "express";
import { z, type ZodType } from "zod";

export const validateRequest = (
  schema: ZodType
): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Validation error",
        errorDetails: result.error.issues,
      });
    }

    req.body = (result.data as { body: unknown }).body;
    next();
  };
};
