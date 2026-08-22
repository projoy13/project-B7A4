import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app.error";
import type { ICreateReview } from "./review.interface";

const createReview = async (
  payload: ICreateReview
) => {
  const {
    rating,
    comment,
    userId,
    gearItemId,
  } = payload;

  // Validate rating
  if (rating < 1 || rating > 5) {
    throw new AppError(
      400,
      "Rating must be between 1 and 5"
    );
  }

  // Check user
  const user = await prisma.user.findUnique({
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
  const gear = await prisma.gearItem.findUnique({
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

  // Create review
 const review = await prisma.review.create({
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
        email: true,
      },
    },

    gearItem: true,
  },
});

  return review;
};

// Get all reviews
const getAllReviews = async () => {
  const reviews = await prisma.review.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
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

// Get reviews for a specific gear
const getReviewsByGear = async (
  gearItemId: string
) => {
  const gear = await prisma.gearItem.findUnique({
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

  const reviews = await prisma.review.findMany({
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

// Get single review
const getSingleReview = async (
  id: string
) => {
  const review = await prisma.review.findUnique({
    where: {
      id,
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
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

// Delete review
const deleteReview = async (
  id: string
) => {
  const review = await prisma.review.findUnique({
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
  deleteReview,
};