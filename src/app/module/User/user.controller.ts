import pick from "../../../lib/pick";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { UserService } from "./user.services";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { userFilterableFields } from "./user.constance";
import { paginationHealperOptions } from "../../../lib/paginationHealper";

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

    const result = await UserService.createVendor(req)
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

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, userFilterableFields)
    const options = pick(req.query, paginationHealperOptions)

    const result = await UserService.getAllFromDB(filter, options)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users fetched successfully",
        meta: result.meta,
        data: result.result
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await UserService.deleteFromDB(id as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users delete successfully",
        data: result
    });
});


export const UserController = {
    createAdmin,
    createVendor,
    createCustomer,
    getAllFromDB,
    deleteFromDB
}