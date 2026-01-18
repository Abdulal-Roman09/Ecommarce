import httpStatus from "http-status";
import { Request, Response } from "express";
import { VendorServices } from "./vendor.service";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await VendorServices.getAllFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Vendors fetched successfully",
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    
    const { id } = req.params;
    const result = await VendorServices.deleteFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Vendor deleted successfully",
        data: result,
    });
});

export const VendorController = {
    getAllFromDB,
    deleteFromDB,
};
