import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

const createToken = (
  payload: object,
  secret: Secret,
  expiresIn: SignOptions,
) => {
  if (!expiresIn) {
    throw new Error("JWT expiration time is missing");
  }

  const token = jwt.sign(payload, secret, {
    expiresIn,
  } as SignOptions);

  return token;
};

export const jwtUtils = {
  createToken,
};