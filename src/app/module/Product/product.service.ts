import prisma from "../../../lib/prisma";
import sendToCloudinary from "../../../lib/sendToCloudinary";
import { FromDataProps } from "../../interface/FromDataProps";

const insertIntoDB = async (payload: FromDataProps) => {
    const { file, body } = payload

    let fileUrl = ""
    if (file) {
        const uploaded = await sendToCloudinary(file)
        if (uploaded?.secure_url) {
            fileUrl = uploaded.secure_url
        }
    }
    const result = await prisma.product.create({
        data: {
            ...body.product,
            image: fileUrl
        }
    })
    return result
};

export const ProductServices = {
    insertIntoDB,
};
