import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { PaymentsServices } from "./payment.service";
import sendResponse from "../../../utils/sendResponse";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const token = req.headers.authorization;

    const result = await PaymentsServices.insertIntoDB(id as string, token as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Payments created successfully",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentsServices.getAllFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Paymentss fetched successfully",
        data: result
    });
});


export const PaymentsController = {
    insertIntoDB,
    getAllFromDB
};
