import httpStatus from "http-status";
import pick from "../../../lib/pick";
import { Request, Response } from "express";
import { VendorServices } from "./vendor.service";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { paginationHealperOptions } from "../../../lib/paginationHealper";
import { vendorFilterableFields } from "./vendor.constance";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

    const filter = pick(req.query, vendorFilterableFields)
    const options = pick(req.query, paginationHealperOptions)
    const result = await VendorServices.getAllFromDB(filter, options)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Vendors fetched successfully",
        meta: result.meta,
        data: result.data
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

const softDeleteFromDB = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await VendorServices.softDeleteFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Vendor is soft Delted successfully",
        data: result,
    });
});

export const VendorController = {
    getAllFromDB,
    deleteFromDB,
    softDeleteFromDB
};
