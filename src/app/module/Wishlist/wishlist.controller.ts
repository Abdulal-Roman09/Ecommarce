import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { WishlistServices } from "./wishlist.service";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const token = req.headers.authorization;
    const result = await WishlistServices.insertIntoDB(id as string,token as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Wishlists fetched successfully",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await WishlistServices.getAllFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Wishlists fetched successfully",
        data: result
    });
});


export const WishlistController = {
    insertIntoDB,
    getAllFromDB

};
