
import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { CategoryServices } from "./category.service";

const insertInoDB = catchAsync(async (req: Request, res: Response) => {

    const result = await CategoryServices.insertInoDB(req)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Category create successfully!",
        data: result
    });
})

export const CategoryController = {
    insertInoDB
};