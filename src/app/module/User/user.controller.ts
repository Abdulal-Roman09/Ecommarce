import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserService } from "./user.services";
import sendResponse from "../../../utils/sendResponse";

const createUser = async (req: Request, res: Response) => {

    try {
        const result = await UserService.createUser(req.body)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "user is created",
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

const getAllUser = async (req: Request, res: Response) => {

    try {
        const result = await UserService.getAllUser(req.body)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "user is created",
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

export const UserController = {
    createUser,
    getAllUser
};