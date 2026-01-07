import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserService } from "./user.services";
import sendResponse from "../../../utils/sendResponse";
import catchAsync from "../../../utils/catchAsync";

const createAdmin = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createAdmin(req)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin is created",
        data: result
    });
})

const createVendor = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createVendor(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Vendor is created",
        data: result
    });
})

const createCustomer = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createCustomer(req)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Customer is created",
        data: result
    });
})


export const UserController = {
    createAdmin,
    createVendor,
    createCustomer
}