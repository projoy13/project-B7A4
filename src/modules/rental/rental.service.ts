import type { Request, Response } from "express";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app.error";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import type { ICreateRental, IUpdateRentalStatus } from "./rental.interface";

const createRental = async (payload: ICreateRental) => {
  const {
    customerId,
    startDate,
    endDate,
    items,
  } = payload;

  // Check rental items
  if (!items || items.length === 0) {
    throw new AppError(
      400,
      "At least one gear item is required"
    );
  }

  // Convert dates
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Validate dates
  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    throw new AppError(
      400,
      "Invalid rental date"
    );
  }

  if (start >= end) {
    throw new AppError(
      400,
      "End date must be after start date"
    );
  }

  // Calculate rental days
  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  const rentalDays = Math.ceil(
    (end.getTime() - start.getTime()) /
      millisecondsPerDay
  );

  // Get gear IDs
  const gearIds = items.map(
    (item) => item.gearId
  );

  // Find gear items
  const gears = await prisma.gearItem.findMany({
    where: {
      id: {
        in: gearIds,
      },
    },
  });

  // Check whether all gear exists
  if (gears.length !== gearIds.length) {
    throw new AppError(
      404,
      "One or more gear items were not found"
    );
  }

  // Check stock
  for (const item of items) {
    const gear = gears.find(
      (gear) => gear.id === item.gearId
    );

    if (!gear) {
      throw new AppError(
        404,
        `Gear item ${item.gearId} not found`
      );
    }

    if (item.quantity <= 0) {
      throw new AppError(
        400,
        "Quantity must be greater than 0"
      );
    }

    if (gear.stock < item.quantity) {
      throw new AppError(
        400,
        `Not enough stock for ${gear.name}`
      );
    }
  }

  // Calculate rental items and total
  let totalAmount = 0;

  const rentalItems = items.map((item) => {
    const gear = gears.find(
      (gear) => gear.id === item.gearId
    );

    if (!gear) {
      throw new AppError(
        404,
        `Gear item ${item.gearId} not found`
      );
    }

    const itemTotal =
      Number(gear.pricePerDay) *
      item.quantity *
      rentalDays;

    totalAmount += itemTotal;

    return {
      gearItem: {
        connect: {
          id: gear.id,
        },
      },
      quantity: item.quantity,
      pricePerDay: gear.pricePerDay,
    };
  });

  // Create rental order and update stock
  const result = await prisma.$transaction(
    async (tx) => {
      // Create rental order
      const rentalOrder =
        await tx.rentalOrder.create({
          data: {
            customerId,
            startDate: start,
            endDate: end,
            totalAmount,

            items: {
              create: rentalItems,
            },
          },

          include: {
            items: {
              include: {
                gearItem: true,
              },
            },
          },
        });

      // Decrease gear stock
      for (const item of items) {
        await tx.gearItem.update({
          where: {
            id: item.gearId,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return rentalOrder;
    }
  );

  return result;
};

// Get all rental orders
const getAllRentals = async () => {
  console.log("RENTAL SERVICE STARTED");

  const result = await prisma.rentalOrder.findMany();

  console.log("PRISMA QUERY FINISHED");

  return result;
};

// Get single rental order
const getSingleRental = async (id: string) => {
  const result =
    await prisma.rentalOrder.findUnique({
      where: {
        id,
      },

      include: {
        items: {
          include: {
            gearItem: true,
          },
        },
        payment: true,
      },
    });

  if (!result) {
    throw new AppError(
      404,
      "Rental order not found"
    );
  }

  return result;
};

const updateRentalStatus = async (
  id: string,
  providerId: string,
  payload: IUpdateRentalStatus
) => {
  const rental = await prisma.rentalOrder.findFirst({
    where: {
      id,
      items: {
        some: {
          gearItem: {
            is: {
              providerId: providerId,
            },
          },
        },
      },
    },
  });

  if (!rental) {
    throw new AppError(
      404,
      "Rental order not found or you do not have permission to update it"
    );
  }

  const result = await prisma.rentalOrder.update({
    where: {
      id: id,
    },
    data: {
      status: payload.status,
    },
  });

  return result;
};

const getMyrentals=async(customerId:string)=>{
  const result=await prisma.rentalOrder.findMany({
    where:{
      customerId:customerId
    },
    include:{
      items:{
        include:{
          gearItem:true
        }
      },
      payment:true
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  return result
}






// th provider can see whic gear customer rented

const getProviderorders = async (providerId: string) => {
  // 1. Find provider's gear
  const providerGears = await prisma.gearItem.findMany({
    where: {
      providerId: providerId,
    },
    select: {
      id: true,
    },
  });

  const gearIds = providerGears.map((gear) => gear.id);

  // 2. Find rental items belonging to provider's gear
  const rentalItems = await prisma.rentalItem.findMany({
    where: {
      gearItemId: {
        in: gearIds,
      },
    },
    select: {
      rentalOrderId: true,
      gearItemId: true,
      quantity: true,
    },
  });

  // 3. Get unique rental order IDs
  const rentalOrderIds = [
    ...new Set(rentalItems.map((item) => item.rentalOrderId)),
  ];

  // 4. Fetch complete rental orders
  const orders = await prisma.rentalOrder.findMany({
    where: {
      id: {
        in: rentalOrderIds,
      },
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        where: {
          gearItemId: {
            in: gearIds,
          },
        },
        include: {
          gearItem: true,
        },
      },
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};







export const RentalService = {
  createRental,
  getAllRentals,
  getSingleRental,
  updateRentalStatus,
  getMyrentals,
   getProviderorders
};