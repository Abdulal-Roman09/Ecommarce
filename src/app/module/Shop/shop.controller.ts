import httpStatus from "http-status";
import { Request, Response } from "express";
import { ShopServices } from "./shop.service";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { FromDataProps } from "../../interface/FromDataProps";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ShopServices.insertIntoDB(req as FromDataProps);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Shop created successfully.",
        data: result,
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ShopServices.getAllFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Shops retrieved successfully.",
        data: result,
    });
});

const softDeleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ShopServices.softDeleteFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Shop deleted successfully.",
        data: result,
    });
});

export const ShopController = {
    insertIntoDB,
    getAllFromDB,
    softDeleteFromDB
};
