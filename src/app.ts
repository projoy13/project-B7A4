import express, { type Application } from "express";

import cookieParser from "cookie-parser";
import cors from "cors";

import { notFound } from "./middleware/notfound";
import { globalErrorHandler } from "./middleware/global-error";

import { authRoutes } from "./modules/auth/auth.route";
import userRouter from "./modules/user/user.route";
import { gearRouter } from "./modules/gear/gear.route";
import { categoryRouter } from "./modules/category/category.route";
import { paymentRouter } from "./modules/payment/payment.route";
import { rentalRouter } from "./modules/rental/rental.route";
import reviewRouter from "./modules/review/review.route";

const app: Application = express();

app.use(
  cors({
    origin:
      process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Stripe webhook MUST come before express.json()
app.use(
  "/api/payments/webhook",
  express.raw({
    type: "application/json",
  })
);

// Normal JSON parser
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

// Auth
app.use("/api/auth", authRoutes);

// Users
app.use("/api/admin/users", userRouter);

// Gear
app.use("/api/gear", gearRouter);

// Categories
app.use("/api/categories", categoryRouter);

// Rentals
app.use("/api/rentals", rentalRouter);

// Payments
app.use("/api/payments", paymentRouter);

// Reviews
app.use("/api/reviews", reviewRouter);

app.get("/", (_req, res) => {
  res.send("GearUp server is running");
});

// Not Found
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;