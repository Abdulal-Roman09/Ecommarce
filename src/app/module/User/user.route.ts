import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../lib/multer";
import { UserController } from "./user.controller";
import { UserValidationSchema } from "./user.validation";
import express, { NextFunction, Request, Response } from "express";

const router = express.Router()

router.post(
    "/create-admin",
    auth(UserRole.ADMIN),
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidationSchema.createAdmin.parse(JSON.parse(req.body.data))
        return UserController.createAdmin(req, res, next)
    }
)

router.post(
    "/create-vendor",
    auth(UserRole.ADMIN),
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidationSchema.createVendor.parse(JSON.parse(req.body.data))
        return UserController.createVendor(req, res, next)
    }
)

router.post(
    "/create-customer",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidationSchema.createCustomer.parse(JSON.parse(req.body.data))
        return UserController.createCustomer(req, res, next)
    }
)


export const UserRoutes = router