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
// import gearRouter  from "./modules/gear/gear.route";

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


// auth
app.use("/api/auth", authRoutes);

// user
app.use("/api/admin/users", userRouter);

// gear
app.use("/api/gear", gearRouter);

// gear categoty
app.use("/api/categories", categoryRouter);

// rentals
app.use("/api/rentals", rentalRouter);

// payment
app.use('/api/payments',paymentRouter)

// review
app.use("/api/reviews", reviewRouter);

app.get("/", (_req, res) => {
  res.send("GearUp server is running");
});


// Not Found
app.use(notFound);


// Global Error Handler
app.use(globalErrorHandler);

export default app;