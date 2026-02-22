import httpStatus from "http-status";
import prisma from "../../../lib/prisma";
import AppError from "../../errors/appError";
import { IUploadedFile } from "../../interface/file";
import sendToCloudinary from "../../../lib/sendToCloudinary";
import { FromDataProps } from "../../interface/FromDataProps";

const insertIntoDB = async (payload: FromDataProps) => {
    const files = payload?.files as IUploadedFile[];
    const body = payload?.body;
    console.log("data:", body)

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

    if (!body || !body.name) {
        throw new AppError(httpStatus.BAD_REQUEST, "Shop name is required");
    }

    const existing = await prisma.shop.findUnique({ where: { name: body.name } });
    if (existing) {
        throw new AppError(httpStatus.CONFLICT, "Shop name already exists");
    }

    const result = await prisma.shop.create({
        data: {
            name: body.name,
            description: body.description,
            email: body.email,
            phone: body.phone,
            address: body.address,
            vendorId: body.vendorId,
            logo: logoUrl,
            banner: bannerUrl,
        },
    });

    return result;
};

const getAllFromDB = async () => {
    return await prisma.shop.findMany()
}

const getSingleFromDB = async (id: string) => {

    const result = await prisma.shop.findFirstOrThrow({
        where: { id, isActive: true }
    })
    return result
}

const updateFromDB = async (id: string, payload: any) => {
    const { files, body } = payload;

    const shop = await prisma.shop.findUniqueOrThrow({ where: { id } });

    if (!shop || shop.isActive === false) {
        throw new AppError(httpStatus.BAD_REQUEST, "Shop not found or inactive");
    }

    // If name is being changed, ensure it's not already used by another shop
    if (body?.name && body.name !== shop.name) {
        const existing = await prisma.shop.findUnique({ where: { name: body.name } });
        if (existing && existing.id !== id) {
            throw new AppError(httpStatus.CONFLICT, "Shop name already exists");
        }
    }

    let logoUrl = shop.logo;
    let bannerUrl = shop.banner;

    if (files?.logo?.[0]) {
        const uploadedLogo = await sendToCloudinary(files.logo[0]);
        if (uploadedLogo?.secure_url) {
            logoUrl = uploadedLogo.secure_url;
        }
    } else if (files?.[0]) {
        const uploadedLogo = await sendToCloudinary(files[0]);
        if (uploadedLogo?.secure_url) logoUrl = uploadedLogo.secure_url;
    }

    if (files?.banner?.[0]) {
        const uploadedBanner = await sendToCloudinary(files.banner[0]);
        if (uploadedBanner?.secure_url) {
            bannerUrl = uploadedBanner.secure_url;
        }
    } else if (files?.[1]) {
        const uploadedBanner = await sendToCloudinary(files[1]);
        if (uploadedBanner?.secure_url) bannerUrl = uploadedBanner.secure_url;
    }

    const result = await prisma.shop.update({
        where: { id },
        data: {
            name: body?.name ?? shop.name,
            description: body?.description ?? shop.description,
            phone: body?.phone ?? shop.phone,
            vendorId: body?.vendorId ?? shop.vendorId,
            address: body?.address ?? shop.address,
            logo: logoUrl,
            banner: bannerUrl,
        },
    });

    return result;
};

const softDeleteFromDB = async (id: string) => {

    await prisma.shop.findUniqueOrThrow({
        where: {
            id
        }
    })
    const result = await prisma.shop.update({

        where: { id },
        data: {
            isActive: false
        }
    })
    return result
}

const verifedShop = async (id: string) => {

    await prisma.shop.findUniqueOrThrow({ where: { id } })
    const result = await prisma.shop.update({
        where: { id },
        data: {
            isVerified: true,
        },
    })
    return result
}

const blockedShop = async (id: string) => {

    await prisma.shop.findUniqueOrThrow({ where: { id } })
    const result = await prisma.shop.update({
        where: { id },
        data: {
            isActive: false,
            isVerified: false,
        },
    })
    return result
}

export const ShopServices = {
    insertIntoDB,
    getAllFromDB,
    getSingleFromDB,
    updateFromDB,
    softDeleteFromDB,
    verifedShop,
    blockedShop
};