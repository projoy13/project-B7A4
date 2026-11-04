
import jwt, {
  type Secret,
  type SignOptions,
  type JwtPayload,
} from "jsonwebtoken";

const createToken = (
  payload: object,
  secret: Secret,
  options: SignOptions
) => {
  return jwt.sign(payload, secret, options);
};

const verifyToken = async (
  token: string,
  secret: Secret
) => {
  try {
    const decoded = jwt.verify(token, secret);

    return {
      success: true,
      data: decoded,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Invalid or expired token",
    };
  }
};

export const jwtUtils = {
  createToken,
  verifyToken,
};
