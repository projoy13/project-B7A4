import prisma from "../../lib/prisma";
import { UserStatus } from "../../../prisma/generated/prisma/enums";

const getUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      status: UserStatus.ACTIVE,
    },

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
    },
  });

  return users;
};

export const userService = {
  getUsers,
};