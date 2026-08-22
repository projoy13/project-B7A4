import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { catchAsync } from "../utils/catch-async";
import { AppError } from "../utils/app.error";
import { jwtUtils } from "../utils/jwt";
import config from "../config";

export const auth = (...requiredRoles: string[]) => {
  return catchAsync(
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      const authorization = req.headers.authorization;

      if (!authorization) {
        throw new AppError(401, "You are not authorized");
      }

      const token = authorization.startsWith("Bearer ")
        ? authorization.slice(7)
        : authorization;

      const decoded = jwtUtils.verifyToken(
        token,
        config.jwt_access_secret
      ) as {
        id: string;
        name: string;
        email: string;
        role: string;
      };

      if (
        requiredRoles.length > 0 &&
        !requiredRoles.includes(decoded.role)
      ) {
        throw new AppError(
          403,
          "You do not have permission"
        );
      }

      req.user = decoded;

      next();
    }
  );
};