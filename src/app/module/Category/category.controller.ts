import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { CategoryServices } from "./category.service";
import { FromDataProps } from "../../interface/FromDataProps";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryServices.insertIntoDB(req as FromDataProps);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Category created successfully.",
        data: result,
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryServices.getAllFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Categories retrieved successfully.",
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryServices.deleteFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category deleted successfully.",
        data: result,
    });
});

export const CategoryController = {
    insertIntoDB,
    getAllFromDB,
    deleteFromDB,
};
