import { UserStatus } from "@prisma/client";
import config from "../../../config";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../../../lib/jwtTokenGenerate&Verify";
import { JwtPayload } from "jsonwebtoken";

const login = async (payload: any) => {

    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    });
    const isCorrectPassword = await bcrypt.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Password is not correct!");
    }
    const accessToken = generateToken(
        { email: userData.email, role: userData.role },
        config.access_token.secret as string,
        config.access_token.expiresIn as string
    );

    const refreshToken = generateToken(
        { email: userData.email, role: userData.role },
        config.refresh_token.secret as string,
        config.refresh_token.expiresIn as string
    );

    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.isPasswordChagne
    };
};

const refreshToken = async (token: string) => {
    let decodedData
    try {
        decodedData = verifyToken(token, config.refresh_token.secret) as JwtPayload
    } catch (err) {
        throw new Error("You are not authorized!");
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

export const AuthService = {
    login,
    refreshToken
};