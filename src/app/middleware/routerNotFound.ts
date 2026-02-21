import httpStatus from 'http-status'
import { NextFunction, Request, Response } from "express";

const routerNotFound = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'API endpoint not found',
        error: {
            path: req.originalUrl,
            method: req.method
        }
    })
}

export default routerNotFound