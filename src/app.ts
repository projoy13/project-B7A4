import express, { type Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { notFound } from "./middleware/notfound";
import { globalErrorHandler } from "./middleware/global-error";

import { authRoutes } from "./modules/auth/auth.route";
import userRouter from "./modules/user/user.route";

const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());


// Routes
app.use("/api/auth", authRoutes);


app.use("/api/users", userRouter);


app.get("/", (_req, res) => {
  res.send("GearUp server is running");
});


// Not Found
app.use(notFound);


// Global Error Handler
app.use(globalErrorHandler);

export default app;