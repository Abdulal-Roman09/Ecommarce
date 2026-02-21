import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { InventorServices } from "./inventory.service";
import sendResponse from "../../../utils/sendResponse";
import { FromDataProps } from "../../interface/FromDataProps";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await InventorServices.insertIntoDB(req as FromDataProps);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Inventor created successfully.",
        data: result,
    });
});


export const InventorController = {
    insertIntoDB
};
