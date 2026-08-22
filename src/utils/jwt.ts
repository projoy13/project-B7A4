import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

const createToken = (
  payload: object,
  secret: Secret,
  expiresIn: SignOptions
) => {
  return jwt.sign(payload, secret, expiresIn);
};

const verifyToken = (
  token: string,
  secret: Secret
) => {
  return jwt.verify(token, secret);
};

export const jwtUtils = {
  createToken,
  verifyToken,
};