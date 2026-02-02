import prisma from "../../../lib/prisma";

const insertIntoDB = async (payload: any) => {
    const result = await prisma.$transaction(async (tx) => {
        const createInventory = await tx.inventory.create({
            data: payload
        }) 

    });

    return result;
};

export const InventorServices = {
    insertIntoDB,
};
