import prisma from "../../lib/prisma";

import { AppError } from "../../utils/app.error";

import type {
  ICreateReview,
  IUpdateReview,
} from "./review.interface";


// ===============================
// CREATE REVIEW
// ===============================

const createReview = async (
  userId: string,
  payload: ICreateReview
) => {
  const {
    rating,
    comment,
    gearItemId,
  } = payload;


  // Check user

  const user =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

  if (!user) {
    throw new AppError(
      404,
      "User not found"
    );
  }


  // Check gear

  const gear =
    await prisma.gearItem.findUnique({
      where: {
        id: gearItemId,
      },
    });

  if (!gear) {
    throw new AppError(
      404,
      "Gear item not found"
    );
  }


  // Check whether user already reviewed
  // this gear

  const existingReview =
    await prisma.review.findFirst({
      where: {
        userId,
        gearItemId,
      },
    });

  if (existingReview) {
    throw new AppError(
      409,
      "You have already reviewed this gear"
    );
  }


  // Create review

  const review =
    await prisma.review.create({
      data: {
        rating,
        userId,
        gearItemId,

        ...(comment !== undefined && {
          comment,
        }),
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },

        gearItem: true,
      },
    });


  return review;
};


// ===============================
// GET ALL REVIEWS
// ===============================

const getAllReviews = async () => {
  const reviews =
    await prisma.review.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },

        gearItem: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return reviews;
};


// ===============================
// GET REVIEWS BY GEAR
// ===============================

const getReviewsByGear = async (
  gearItemId: string
) => {

  // Check gear

  const gear =
    await prisma.gearItem.findUnique({
      where: {
        id: gearItemId,
      },
    });

  if (!gear) {
    throw new AppError(
      404,
      "Gear item not found"
    );
  }


  // Get reviews

  const reviews =
    await prisma.review.findMany({
      where: {
        gearItemId,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });


  return reviews;
};


// ===============================
// GET SINGLE REVIEW
// ===============================

const getSingleReview = async (
  id: string
) => {

  const review =
    await prisma.review.findUnique({
      where: {
        id,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },

        gearItem: true,
      },
    });


  if (!review) {
    throw new AppError(
      404,
      "Review not found"
    );
  }


  return review;
};


// ===============================
// UPDATE REVIEW
// ===============================

const updateReview = async (
  id: string,
  userId: string,
  payload: IUpdateReview
) => {

  // Find review

  const review =
    await prisma.review.findUnique({
      where: {
        id,
      },
    });


  if (!review) {
    throw new AppError(
      404,
      "Review not found"
    );
  }


  // Check ownership

  if (review.userId !== userId) {
    throw new AppError(
      403,
      "You can only update your own review"
    );
  }


  // Update

  const updatedReview =
    await prisma.review.update({
      where: {
        id,
      },

      data: payload,

      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },

        gearItem: true,
      },
    });


  return updatedReview;
};


// ===============================
// DELETE REVIEW
// ===============================

const deleteReview = async (
  id: string,
  userId: string,
  role: string
) => {

  // Find review

  const review =
    await prisma.review.findUnique({
      where: {
        id,
      },
    });


  if (!review) {
    throw new AppError(
      404,
      "Review not found"
    );
  }


  // Customer can delete only
  // their own review.
  //
  // Admin can delete any review.

  if (
    role !== "ADMIN" &&
    review.userId !== userId
  ) {
    throw new AppError(
      403,
      "You can only delete your own review"
    );
  }


  await prisma.review.delete({
    where: {
      id,
    },
  });


  return null;
};


export const ReviewService = {
  createReview,
  getAllReviews,
  getReviewsByGear,
  getSingleReview,
  updateReview,
  deleteReview,
};