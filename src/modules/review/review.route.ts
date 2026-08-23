import { Router } from "express";
import { ReviewController } from "./review.controller";
import { auth } from "../../middleware/auth";

const reviewRouter = Router();

reviewRouter.post(
  "/",auth("COUSTOMER"),
  ReviewController.createReview
);

reviewRouter.get(
  "/",
  ReviewController.getAllReviews
);

reviewRouter.get(
  "/gear/:gearItemId",
  ReviewController.getReviewsByGear
);

reviewRouter.get(
  "/:id",
  ReviewController.getSingleReview
);

reviewRouter.delete(
  "/:id",
  ReviewController.deleteReview
);

export default reviewRouter;