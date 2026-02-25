import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { OrderServices } from "./order.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const token = req.headers.authorization;

    const result = await OrderServices.insertIntoDB(id as string, token as string, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Order created successfully",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderServices.getAllFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Orders fetched successfully",
        data: result
    });
});


export const OrderController = {
    insertIntoDB,
    getAllFromDB
};
