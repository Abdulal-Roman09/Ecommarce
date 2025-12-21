import { Response } from "express"


const sendResponse = <T>(
    res: Response,
    payload: {
        statusCode: number,
        success: boolean,
        message: string,
        meta?: {
            page: number,
            total: number,
            limit: number
        } | null,
        data: T | null,
        errro?: string
    }
) => {
    res.status(payload.statusCode).json({
        success: payload.success,
        message: payload.message,
        meta: payload.meta ?? null,
        data: payload.data ?? null,
        ...(payload.errro && { error: payload.errro })
    })
}

export default sendResponse




