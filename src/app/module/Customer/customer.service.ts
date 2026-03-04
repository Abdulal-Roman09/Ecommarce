import prisma from "../../../lib/prisma";

const getAllFromDB = async () => {
    return await prisma.customer.findMany({
        where: {
            isDeleted: false
        }
    });
};

const singleFromDB = async (id: string) => {
    return await prisma.customer.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
};

const updateFromDB = async (id: string, payload: any) => {
    await prisma.customer.findUniqueOrThrow({
        where: { id }
    });

    const result = await prisma.customer.update({
        where: { id },
        data: payload
    });
    return result;
};

const deleteFromDB = async (id: string) => {
    await prisma.customer.findUniqueOrThrow({
        where: { id }
    });

    const result = await prisma.customer.delete({
        where: { id }
    });
    return result;
};

const softDeleteFromDB = async (id: string) => {
    await prisma.customer.findUniqueOrThrow({
        where: { id }
    });

    const result = await prisma.customer.update({
        where: { id },
        data: {
            isDeleted: true
        }
    });
    return result;
};

export const CustomerServices = {
    getAllFromDB,
    singleFromDB,
    updateFromDB,
    deleteFromDB,
    softDeleteFromDB
};