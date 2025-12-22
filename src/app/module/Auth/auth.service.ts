import { UserStatus } from "@prisma/client";
import config from "../../../config";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../../../lib/jwtTokenGenerate&Verify";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/appError";
import httpStatus from 'http-status'
import { IAuthLogin, IAuthUser } from "../../interface/auth";
import { IChangePassword, ILoginResponse } from "./auth.interfact";

const login = async (payload: IAuthLogin): Promise<ILoginResponse> => {

    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: payload?.email,
            status: UserStatus.ACTIVE
        }
    });

    const isCorrectPassword = await bcrypt.compare(payload?.password as string, userData.password);

    if (!isCorrectPassword) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password is not correct!");
    }

    const accessToken = generateToken(
        { email: userData.email, role: userData.role },
        config.access_token.secret,
        config.access_token.expiresIn
    );

    const refreshToken = generateToken(
        { email: userData.email, role: userData.role },
        config.refresh_token.secret,
        config.refresh_token.expiresIn
    );

    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.isPasswordChagne
    };
};

const refreshToken = async (token: string): Promise<Partial<ILoginResponse>> => {
    let decodedData
    try {
        decodedData = verifyToken(token, config.refresh_token.secret) as JwtPayload
    } catch (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData?.email,
            status: UserStatus.ACTIVE
        }
    });
    const accessToken = generateToken(
        {
            email: userData.email,
            role: userData.role
        },
        config.access_token.secret,
        config.access_token.expiresIn
    );

    return {
        accessToken,
        needPasswordChange: userData.isPasswordChagne
    }
}

const changePassword = async (user: IAuthUser, payload: IChangePassword) => {
    const { newPassword, oldPassword } = payload

    const userData = await prisma.user.findUnique({
        where: {
            email: user?.email,
            status: UserStatus.ACTIVE
        }
    })

    const isCorrectPassword = await bcrypt.compare(oldPassword, userData?.password as string)

    if (!isCorrectPassword) {
        throw new AppError(httpStatus.UNAUTHORIZED, "you are unAuthrized")
    }

    const hasedNewPassword = await bcrypt.hash(newPassword, config.solt_round)

    await prisma.user.update({
        where: {
            id: userData?.id
        },
        data: {
            password: hasedNewPassword
        }
    })

    return {
        message: "password change successfully"
    }
}

const forgetPassword = async (payload: { email: string }) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })
    const resetToken = generateToken(
        {
            eamil: userData.email,
            role: userData.role
        },
        config.reset_token.secret,
        config.reset_token.expiresIn
    )
    const resetPasswordLink = config.baseUrl + `?userId=${userData.id}&token=${resetToken}`
    console.log(resetPasswordLink)

}

export const AuthService = {
    login,
    refreshToken,
    changePassword,
    forgetPassword
};