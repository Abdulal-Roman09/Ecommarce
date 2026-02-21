import prisma from "../../../lib/prisma";
import { IUploadedFile } from "../../interface/file";
import sendToCloudinary from "../../../lib/sendToCloudinary";

const insertIntoDB = async (payload: any) => {
    const files = payload?.files as IUploadedFile[]

    let logoUrl = "";
    let bannerUrl = "";

    if (files && files.length > 0) {
        const uploadedLogo = await sendToCloudinary(files[0]);
        if (uploadedLogo?.secure_url) logoUrl = uploadedLogo.secure_url;
    }

    if (files && files.length > 1) {
        const uploadedBanner = await sendToCloudinary(files[1]);
        if (uploadedBanner?.secure_url) bannerUrl = uploadedBanner.secure_url;
    }

    const result = await prisma.shop.create({
        data: {
            ...payload?.body.Shop,
            logo: logoUrl,
            banner: bannerUrl,
        },
    });

    console.log(result);
    return result;
};

export const ShopServices = {
    insertIntoDB,
};