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
      // Get the authorization header from the request
      const authorization = req.headers.authorization;

      // Check whether the authorization header exists
      if (!authorization) {
        throw new AppError(401, "You are not authorized");
      }

      // Extract the token by removing the Bearer prefix
      const token = authorization.startsWith("Bearer ")
        ? authorization.slice(7)
        : authorization;

      // Verify the access token using the JWT access secret
      const decoded = await jwtUtils.verifyToken(
        token,
        config.jwt_access_secret
      );

      // Check whether the token verification was successful
      if (!decoded.success || !decoded.data) {
        throw new AppError(401, "Invalid or expired token");
      }

      // Store the decoded user information
      const user = decoded.data as {
        id: string;
        name: string;
        email: string;
        role: string;
      };

      // Check whether the user has the required role
      if (
        requiredRoles.length > 0 &&
        !requiredRoles.includes(user.role)
      ) {
        throw new AppError(
          403,
          "You do not have permission"
        );
      }

      // Attach authenticated user information to the request
      req.user = user;

      // Continue to the next middleware or controller
      next();
    }
  );
};