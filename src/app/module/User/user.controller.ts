import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserService } from "./user.services";
import sendResponse from "../../../utils/sendResponse";
import catchAsync from "../../../utils/catchAsync";

const createAdmin = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createAdmin(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin is created",
        data: result
    });
})



export const UserController = {
    createAdmin,
};