import type {
  NextFunction,
  Request,
  Response,
} from "express";

import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catch-async";
import config from "../config";

const auth = () => {
  return catchAsync(
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      let token: string | undefined;

      // Get token from cookie
      if (req.cookies?.accessToken) {
        token = req.cookies.accessToken;
      }

      // Get token from Authorization header
      if (
        !token &&
        req.headers.authorization?.startsWith("Bearer ")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        throw new Error("You are not authorized");
      }

      // Verify token
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      );

      console.log(decoded);

      next();
    }
  );
};

export default auth;