import { fileUploader } from "../../../lib/multer"
import { CategoryController } from "./category.controller"
import { CategoryValidationSchema } from "./category.contance"
import express, { NextFunction, Request, Response } from "express"

const router = express.Router()

router.get(
    "/",
    CategoryController.getAllFromDB)

router.post(
    "/create-category",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = CategoryValidationSchema.createCategory.parse(JSON.parse(req.body.data))
        return CategoryController.insertIntoDB(req, res, next)
    }

)

export const CategoryRouters = router