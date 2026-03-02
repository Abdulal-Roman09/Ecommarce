import prisma from "../../../lib/prisma";
import { generateSlug } from "../../../lib/generateSlug";
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

    const slug = await generateSlug("brand", body.name);

    const result = await prisma.brand.create({
        data: {
            name: body.name,
            logo: fileUrl,
            vendorId: body.vendorId,
            description: body.description,
            slug,
        },
    });

    return result;
};

const getAllFromDB = async () => {
    return prisma.brand.findMany();
};

const singleFromDB = async (id: string) => {
    const result = prisma.brand.findUniqueOrThrow({
        where: {
            id
        }
    });
    return result
};

const deleteFromDB = async (id: string) => {
    const result = prisma.brand.delete({
        where: { id }
    });
    return result
};

export const BrandServices = {
    insertIntoDB,
    getAllFromDB,
    singleFromDB,
    deleteFromDB
};
