import jwt, {
  type Secret,
  type SignOptions,
} from "jsonwebtoken";

const createToken = (
  payload: object,
  secret: Secret,
  options: SignOptions
) => {
  return jwt.sign(payload, secret, options);
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