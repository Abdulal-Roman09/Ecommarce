import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { InventoryServices } from "./inventory.service";

const addQuantity = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body as { quantity: number };

    const result = await InventoryServices.addQuantity(id as string, quantity);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Inventory quantity updated successfully.",
        data: result
    });
});

const removeQuantity = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body as { quantity: number };

    const result = await InventoryServices.removeQuantity(id as string, quantity);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Inventory quantity updated successfully.",
        data: result
    });
});

export const InventoryController = {
    addQuantity,
    removeQuantity
};
