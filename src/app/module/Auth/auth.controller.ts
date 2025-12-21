import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../utils/sendResponse";
import catchAsync from "../../../utils/catchAsync";
import { AuthService } from "./auth.service";
import config from "../../../config";

const login = catchAsync(async (req: Request, res: Response) => {

    const result = await AuthService.login(req.body)
    const { refreshToken } = result;

    // set token in the cookie in the cookies
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
            needPasswordChange: result.needPasswordChange
        }
    });
})


export const AuthController = {
    login
};