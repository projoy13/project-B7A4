// import { prisma } from "../../lib/prisma";

import prisma from "../../lib/prisma";

const createGearItem = async (payload: {
  name: string;
  description?: string;
  brand?: string;
  pricePerDay: number;
  stock?: number;
  image?: string;
  providerId: string;
  categoryId: string;
}) => {
  const result = await prisma.gearItem.create({
    data: payload,
  });

  return result;
};

const getAllGearItems = async () => {
  const result = await prisma.gearItem.findMany({
    include: {
      provider: true,
      category: true,
    },
  });

  return result;
};

const getSingleGearItem = async (id: string) => {
  const result = await prisma.gearItem.findUnique({
    where: {
      id,
    },
    include: {
      provider: true,
      category: true,
      reviews: true,
      rentalItems: true,
    },
  });

  return result;
};

const updateGearItem = async (
  id: string,
  payload: {
    name?: string;
    description?: string;
    brand?: string;
    pricePerDay?: number;
    stock?: number;
    image?: string;
    categoryId?: string;
  }
) => {
  const result = await prisma.gearItem.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteGearItem = async (id: string) => {
  const result = await prisma.gearItem.delete({
    where: {
      id,
    },
  });

  return result;
};

export const GearService = {
  createGearItem,
  getAllGearItems,
  getSingleGearItem,
  updateGearItem,
  deleteGearItem,
};