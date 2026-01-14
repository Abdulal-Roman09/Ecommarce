import { IUploadedFile } from "./file";

export interface FromDataProps {
    body: any;
    file?: IUploadedFile | undefined
}