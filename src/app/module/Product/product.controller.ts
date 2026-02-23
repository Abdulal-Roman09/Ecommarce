import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { FromDataProps } from "../../interface/FromDataProps";
import { ProductServices } from "./product.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductServices.insertIntoDB(req as FromDataProps);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Product created successfully.",
        data: result,
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductServices.getAllFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product fetched successfully.",
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const {id}=req.params
    const result = await ProductServices.deleteFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product deleted successfully.",
        data: result,
    });
});

const softDeleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const {id}=req.params
    const result = await ProductServices.softDeleteFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product deleted successfully.",
        data: result,
    });
});

export const ProductController = {
    insertIntoDB,
    getAllFromDB,
    deleteFromDB,
    softDeleteFromDB
};
