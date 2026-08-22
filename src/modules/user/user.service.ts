import prisma from "../../lib/prisma";
import { UserStatus } from "../../../prisma/generated/prisma/enums";
import type { IUpdateUserStatus } from "./user.interface";

const getUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return users;
};

const updateUserStatus = async (
  id: string,
  payload: IUpdateUserStatus
) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },

    data: {
      status: payload.status,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};

export const userService = {
  getUsers,
  updateUserStatus,
};