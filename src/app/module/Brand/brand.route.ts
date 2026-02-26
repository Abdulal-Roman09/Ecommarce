import auth from "../../middleware/auth"
import { UserRole } from "@prisma/client"
import { fileUploader } from "../../../lib/multer"
import { BrandController } from "./brand.controller"
import { BrandValidationSchema } from "./brand.validation"
import express, { NextFunction, Request, Response } from "express"

const router = express.Router()

router.get(
    "/",
    auth(UserRole.ADMIN,UserRole.CUSTOMER,UserRole.SUPER_ADMIN),
    BrandController.getAllFromDB
)

router.post(
    "/create-Brand",
    auth(UserRole.ADMIN),
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = BrandValidationSchema.createBrand.parse(JSON.parse(req.body.data))
        return BrandController.insertIntoDB(req, res, next)
    }
)

router.delete(
    "/:id",
    auth(UserRole.ADMIN),
    BrandController.deleteFromDB

)

export const BrandRouters = router