import { IUploadedFile } from "./file";

export interface FromDataProps {
    body: any;
    file?: IUploadedFile | undefined;
    files?: IUploadedFile[] | undefined;
}