import { Response } from "express";


interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: {
        page: number;
        total: number;
        limit: number;
    } | null;
    data: T | null;
    error?: any;
}

const sendResponse = <T>(res: Response, payload: IResponse<T>) => {
    res.status(payload.statusCode).json({
        success: payload.success,
        message: payload.message,
        meta: payload.meta || null,
        data: payload.data || null,
        ...(payload.error && { error: payload.error })
    });
};

export default sendResponse;