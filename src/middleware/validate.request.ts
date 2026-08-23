import type { RequestHandler } from "express";
import { z } from "zod";

export const validateRequest = (
  schema: z.ZodType
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

    // Only update body.
    // req.params and req.query can be read directly
    // from Express and should not be reassigned.
    req.body = (result.data as { body: unknown }).body;

    next();
  };
};