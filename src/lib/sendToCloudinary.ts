import fs from "fs";
import cloudinary from "./cloudinary";
import { ICloudinaryResponse, IUploadedFile } from "../app/interface/file";

const sendToCloudinary = async (
    file: IUploadedFile
): Promise<ICloudinaryResponse | undefined> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file.path,
            (error: Error, result: ICloudinaryResponse) => {
                if (error) {
                    try {
                        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
                    } catch (e) {
                        console.error("Failed to delete local file after error:", e);
                    }
                    reject(error);
                } else {
                    try {
                        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
                    } catch (e) {
                        console.error("Failed to delete local file:", e);
                    }
                    resolve(result);
                }
            }
        );
    });
};

export default sendToCloudinary;