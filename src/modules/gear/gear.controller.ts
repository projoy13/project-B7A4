import type { Request, Response } from "express";
// import { catchAsync } from "../../utils/catchAsync";
// import { AppError } from "../../errors/AppError";
// import { sendResponse } from "../../utils/sendResponse";
import { GearService } from "./gear.service";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { AppError } from "../../utils/app.error";

const createGearItem = catchAsync(
  async (req: Request, res: Response) => {
    const result = await GearService.createGearItem(req.body);

    sendResponse(
      res,
      {
        message: "Gear item created successfully",
        data: result,
      },
      201
    );
  }
);

const getAllGearItems = catchAsync(
  async (req: Request, res: Response) => {
    const result = await GearService.getAllGearItems();

    sendResponse(res, {
      message: "Gear items retrieved successfully",
      data: result,
    });
  }
);

const getSingleGearItem = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const result = await GearService.getSingleGearItem(id);

    if (!result) {
      throw new AppError(404, "Gear item not found");
    }

    sendResponse(res, {
      message: "Gear item retrieved successfully",
      data: result,
    });
  }
);

const updateGearItem = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const existingGear = await GearService.getSingleGearItem(id);

    if (!existingGear) {
      throw new AppError(404, "Gear item not found");
    }

    const result = await GearService.updateGearItem(
      id,
      req.body
    );

    sendResponse(res, {
      message: "Gear item updated successfully",
      data: result,
    });
  }
);

const deleteGearItem = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const existingGear = await GearService.getSingleGearItem(id);

    if (!existingGear) {
      throw new AppError(404, "Gear item not found");
    }

    await GearService.deleteGearItem(id);

    sendResponse(res, {
      message: "Gear item deleted successfully",
      data: null,
    });
  }
);

export const GearController = {
  createGearItem,
  getAllGearItems,
  getSingleGearItem,
  updateGearItem,
  deleteGearItem,
};