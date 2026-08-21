import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: process.env.PORT || "5000",

  DATABASE_URL: process.env.DATABASE_URL,

  bcrypt_salt_round: Number(
    process.env.BCRYPT_SALT_ROUNDS || 10
  ),

  jwt_access_secret:
    process.env.JWT_ACCESS_SECRET || "access-secret",

  jwt_refresh_secret:
    process.env.JWT_REFRESH_SECRET || "refresh-secret",

  jwt_access_expire_in:
    process.env.JWT_ACCESS_EXPIRE_IN || "1d",

  jwt_refresh_expire_in:
    process.env.JWT_REFRESH_EXPIRE_IN || "7d",
};

export default config;