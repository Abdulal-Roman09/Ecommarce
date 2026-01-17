import { UserRole } from "@prisma/client"
import { fileUploader } from "../../../lib/multer"
import auth from "../../middleware/auth"
import { CategoryController } from "./category.controller"
import { CategoryValidationSchema } from "./category.validation"
import express, { NextFunction, Request, Response } from "express"

const router = express.Router()

router.get(
    "/",
    auth(UserRole.ADMIN,UserRole.CUSTOMER,UserRole.SUPER_ADMIN),
    CategoryController.getAllFromDB)

router.post(
    "/create-category",
    auth(UserRole.ADMIN),
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = CategoryValidationSchema.createCategory.parse(JSON.parse(req.body.data))
        return CategoryController.insertIntoDB(req, res, next)
    }
)

router.delete(
    "/:id",
    auth(UserRole.ADMIN),
    CategoryController.deleteFromDB

)

export const CategoryRouters = router