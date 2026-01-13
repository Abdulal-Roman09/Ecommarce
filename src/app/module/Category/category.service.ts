import prisma from "../../../lib/prisma";
import sendToCloudinary from "../../../lib/sendToCloudinary";
import { IUploadedFile } from "../../interface/file";

const insertInoDB = async (req: Request & { file?: IUploadedFile }) => {

    let fileUrl = "";
    if (req.file) {
        const uploaded = await sendToCloudinary(req.file);
        if (uploaded?.secure_url) {
            fileUrl = uploaded.secure_url;
        }
    }
    const result = await prisma.category.create({
        data: {
            title: req?.body?.title,
            icons: fileUrl
        }
    });

    return result;
};



export const CategoryServices = {
    insertInoDB
};