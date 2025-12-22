import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../lib/jwtTokenGenerate&Verify";
import config from "../../config";
import AppError from "../errors/appError";
import httpStatus from 'http-status'
import { IAuthUser } from "../interface/auth";

const auth = (...roles: string[]) => {
    return async (req: Request & { user?: IAuthUser }, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
            }
            const verifiedUser = verifyToken(token, config.access_token.secret);
            req.user = verifiedUser as IAuthUser
            if (roles.length && !roles.includes(verifiedUser.role)) {
                throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized to access this route!");
            }
            next();
        } catch (err) {
            next(err);
        }
    };
};

export default auth;