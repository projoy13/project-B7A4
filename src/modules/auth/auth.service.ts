import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma";
import type { StringValue } from "ms";

import type {
  ILoginUser,
  IRegisterUser,
} from "./auth.interface";

import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { AppError } from "../../utils/app.error";

const registerUser = async (
  payload: IRegisterUser
) => {
  const { name, email, password, role } = payload;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new AppError(
      409,
      "User already exists with this email"
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    config.bcrypt_salt_round
  );

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

const loginUser = async (
  payload: ILoginUser
) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError(
      404,
      "User not found"
    );
  }

  if (user.status === "SUSPENDED") {
    throw new AppError(
      403,
      "Your account has been suspended"
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(
      401,
      "Password is incorrect"
    );
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    {
      expiresIn: config.jwt_access_expire_in as StringValue,
    }
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    {
      expiresIn: config.jwt_refresh_expire_in as StringValue,
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const authService = {
  registerUser,
  loginUser,
};