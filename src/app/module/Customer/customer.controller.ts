import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { CustomerServices } from "./customer.service";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await CustomerServices.getAllFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Customers retrieved successfully",
        data: result,
    });
});

const singleFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CustomerServices.singleFromDB(id as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Customer retrieved successfully",
        data: result,
    });
});

const updateFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CustomerServices.updateFromDB(id as string, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Customer updated successfully",
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CustomerServices.deleteFromDB(id as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Customer deleted permanently",
        data: result,
    });
});

const softDeleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CustomerServices.softDeleteFromDB(id as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Customer deleted successfully",
        data: result,
    });
});

export const CustomerController = {
    getAllFromDB,
    singleFromDB,
    updateFromDB,
    deleteFromDB,
    softDeleteFromDB,
};