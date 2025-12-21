import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserService } from "./user.services";
import sendResponse from "../../../utils/sendResponse";
import catchAsync from "../../../utils/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createUser(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "user is created",
        data: result
    });
})

const getAllUser = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.getAllUser(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "user is fatchd succseefully",
        data: result
    });
})

export const UserController = {
    createUser,
    getAllUser
};