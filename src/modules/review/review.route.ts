import { Router } from "express";

import { ReviewController } from "./review.controller";

import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validate.request";
import { createReviewSchema, updateReviewSchema } from "./review.validation";

const reviewRouter = Router();


// ===============================
// CREATE REVIEW
// ===============================

reviewRouter.post(
  "/",
  auth("CUSTOMER"),
  validateRequest(createReviewSchema),
  ReviewController.createReview
);


// ===============================
// GET ALL REVIEWS
// ===============================

reviewRouter.get(
  "/",
  ReviewController.getAllReviews
);


// ===============================
// GET REVIEWS BY GEAR
// ===============================

reviewRouter.get(
  "/gear/:gearItemId",
  ReviewController.getReviewsByGear
);


// ===============================
// GET SINGLE REVIEW
// ===============================

reviewRouter.get(
  "/:id",
  ReviewController.getSingleReview
);


// ===============================
// UPDATE REVIEW
// ===============================

reviewRouter.patch(
  "/:id",
  auth("CUSTOMER"),
  validateRequest(updateReviewSchema),
  ReviewController.updateReview
);


// ===============================
// DELETE REVIEW
// ===============================

reviewRouter.delete(
  "/:id",
  auth("CUSTOMER", "ADMIN"),
  ReviewController.deleteReview
);


export default reviewRouter;