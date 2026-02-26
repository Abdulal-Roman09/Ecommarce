import prisma from "../../../lib/prisma";
import sendToCloudinary from "../../../lib/sendToCloudinary";
import { FromDataProps } from "../../interface/FromDataProps";

const insertIntoDB = async (payload: FromDataProps) => {
    const { body, file } = payload;

    let fileUrl = "";

    if (file) {
        const uploaded = await sendToCloudinary(file);
        if (uploaded?.secure_url) {
            fileUrl = uploaded.secure_url;
        }
    }

    const result = await prisma..create({
        data: {
            title: body.title,
            icons: fileUrl,
        },
    });

    return result;
};

const getAllFromDB = async () => {
    return prisma.Brand.findMany();
};

const deleteFromDB = async (id: string) => {
    return prisma.Brand.delete({
        where: { id }
    });
};

export const BrandServices = {
    insertIntoDB,
    getAllFromDB,
    deleteFromDB
};
