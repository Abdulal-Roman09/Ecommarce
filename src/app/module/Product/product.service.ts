import prisma from "../../../lib/prisma";
import sendToCloudinary from "../../../lib/sendToCloudinary";
import { IUploadedFile } from "../../interface/file";
import { FromDataProps } from "../../interface/FromDataProps";

const insertIntoDB = async (payload: FromDataProps) => {
    const file = payload.file as IUploadedFile
    let fileUrl = ""
    if (file) {
        const uploaded = await sendToCloudinary(file)
        if (uploaded?.secure_url) {
            fileUrl = uploaded.secure_url
        }
    }

    const result = await prisma.product.create({
        data: {
            ...payload?.body.product,
            image: fileUrl
        }
    })
    console.log(result)
    return result
};

export const ProductServices = {
    insertIntoDB,
};
