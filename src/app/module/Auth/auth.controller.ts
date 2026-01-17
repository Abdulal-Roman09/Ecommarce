import config from "../../../config";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import AppError from "../../errors/appError";
import { IAuthUser } from "../../interface/auth";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

const login = catchAsync(async (req: Request, res: Response) => {

    const result = await AuthService.login(req.body)

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Login failed!");
    }

    const { refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
        secure: config.env === 'production',
        httpOnly: true,
        sameSite: 'none'
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Logged in successfully!",
        data: {
            accessToken: result.accessToken,
            refreshToken:refreshToken,
            needPasswordChange: result.needPasswordChange
        }
    });
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies
    const result = await AuthService.refreshToken(refreshToken)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "access Token is get successfully!",
        data: result
    });
})

const changePassword = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user
    const result = await AuthService.changePassword(user as IAuthUser, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "password chagned successfully!",
        data: result
    });
})

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.forgetPassword(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "link genarted  successfully!",
        data: result
    });
})

const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const token = req.headers.authorization || ""
    console.log(token)
    const result = await AuthService.resetPassword(token, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password successfully reset",
        data: result
    });
})


export const AuthController = {
    login,
    refreshToken,
    changePassword,
    forgetPassword,
    resetPassword
};