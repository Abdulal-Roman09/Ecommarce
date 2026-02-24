import httpStatus from "http-status";
import prisma from "../../../lib/prisma";
import AppError from "../../errors/appError";


const addQuantity = async (id: string, addQty: number) => {

    if (addQty <= 0) {
        throw new AppError(httpStatus.BAD_REQUEST, "Quantity must be greater than zero");
    }

    await prisma.inventory.update({
        where: { id },
        data: {
            quantity: { increment: addQty }
        },
    });

    const result = await prisma.inventory.findUnique({
        where: { id },
        include: {
            product: true
        }
    })

    return result;

};


const removeQuantity = async (id: string, removeQty: number) => {

    if (removeQty <= 0) {
        throw new AppError(httpStatus.BAD_REQUEST, "Quantity must be greater than zero");
    }

    await prisma.inventory.update({
        where: { id },
        data: {
            quantity: { decrement: removeQty }
        },
    });
    const result = await prisma.inventory.findUnique({
        where: { id },
        include: {
            product: true
        }
    })

    return result;

};

const getAllFromDB = async () => {

    const result = await prisma.inventory.findMany({
        include: {
            product: {
                include: {
                    shop: {
                        include: {
                            vendor: true
                        }
                    }
                }
            }
        }
    })
    return result
}

export const InventoryServices = {
    addQuantity,
    removeQuantity,
    getAllFromDB
};
