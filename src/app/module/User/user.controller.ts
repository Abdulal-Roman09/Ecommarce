import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserService } from "./user.services";

const createUser = async (req: Request, res: Response) => {

    try {
        const result = await UserService.createUser(req.body)

        res.status(httpStatus.OK).json({
            success: true,
            message: "user is created",
            result: result
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

const getAllUser = async (req: Request, res: Response) => {

    try {
        const result = await UserService.getAllUser(req.body)

        res.status(httpStatus.OK).json({
            success: true,
            message: "user is created",
            result: result
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

export const UserController = {
    createUser,
    getAllUser
};