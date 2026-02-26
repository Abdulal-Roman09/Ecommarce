import httpStatus from "http-status";
import { Request, Response } from "express";
import { BrandServices } from "./brand.service";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { FromDataProps } from "../../interface/FromDataProps";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await BrandServices.insertIntoDB(req as FromDataProps);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Brand created successfully.",
        data: result,
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await BrandServices.getAllFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Categories retrieved successfully.",
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BrandServices.deleteFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Brand deleted successfully.",
        data: result,
    });
});

export const BrandController = {
    insertIntoDB,
    getAllFromDB,
    deleteFromDB,
};
