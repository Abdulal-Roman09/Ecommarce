import fs from 'fs'
import cloudinary from "./cloudinary"
import { ICloudinaryResponse, IUploadedFile } from '../app/interface/file'

const sendToCloudinary = async (file: IUploadedFile): Promise<ICloudinaryResponse |
    undefined> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path,
            (error: Error, result: ICloudinaryResponse) => {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path)
                }
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            }
        )
    })
}
export default sendToCloudinary