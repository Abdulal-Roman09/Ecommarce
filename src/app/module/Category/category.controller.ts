
import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { CategoryServices } from "./category.service";
import { IUploadedFile } from "../../interface/file";
import { FromDataProps } from "../../interface/FromDataProps";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

    const result = await CategoryServices.insertIntoDB(req as FromDataProps)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category create successfully!",
        data: result
    });
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

    const result = await CategoryServices.getAllFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "get All Category retrive successfully successfully!",
        data: result
    });
})

export const CategoryController = {
    insertIntoDB,
    getAllFromDB
};