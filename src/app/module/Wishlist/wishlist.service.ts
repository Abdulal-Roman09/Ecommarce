import config from "../../../config";
import { verifyToken } from "../../../lib/jwtTokenGenerate&Verify";
import prisma from "../../../lib/prisma";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const insertIntoDB = async (productId: string, accessToken: string) => {

    await prisma.product.findUniqueOrThrow({
        where: { id: productId }
    });

    const decoded = verifyToken(
        accessToken,
        config.access_token.secret
    )

    const userData = await prisma.user.findUniqueOrThrow({
        where: { email: decoded.email },
        include: { customer: true }
    });

    if (!userData.customer) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Customer profile not found"
        );
    }

    const alreadyExists = await prisma.wishlist.findFirst({
        where: {
            productId,
            customerId: userData.customer.id
        }
    });

    if (alreadyExists) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Product already in wishlist"
        );
    }

    const result = await prisma.wishlist.create({
        data: {
            productId,
            customerId: userData.customer.id
        }
    });

    return result;
};

const getAllFromDB = async () => {
    const result = await prisma.wishlist.findMany({
        include: {
            product: true,
            customer: true,
        }
    })
    return result
}

export const WishlistServices = {
    insertIntoDB,
    getAllFromDB
};