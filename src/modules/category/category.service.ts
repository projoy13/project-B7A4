import prisma from "../../lib/prisma";

const createCategory = async (payload: { name: string }) => {
  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          gearItems: true,
        },
      },
    },
  });

  return result;
};

const getSingleCategory = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      gearItems: true,
    },
  });

  return result;
};

const updateCategory = async (
  id: string,
  payload: { name?: string }
) => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteCategory = async (id: string) => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};