import prisma from "../../../lib/prisma";

const getAllFromDB = async () => {
    return prisma.vendor.findMany();
};

const deleteFromDB = async (id: string) => {
    return prisma.vendor.delete({
        where: { id },
    });
};

export const VendorServices = {
    getAllFromDB,
    deleteFromDB,
};
