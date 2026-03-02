import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { BrandServices } from "./brand.service";
import { FromDataProps } from "../../interface/FromDataProps";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await BrandServices.insertIntoDB(req as FromDataProps);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Brand created successfully",
        data: result,
    });
});

const getAllFromDB = catchAsync(async (_req: Request, res: Response) => {
    const result = await BrandServices.getAllFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Brands retrieved successfully",
        data: result,
    });
});

const singleFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BrandServices.singleFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Brand retrieved successfully",
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await BrandServices.deleteFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Brand deleted successfully",
        data: result,
    });
});

export const BrandController = {
    insertIntoDB,
    getAllFromDB,
    singleFromDB,
    deleteFromDB,
};