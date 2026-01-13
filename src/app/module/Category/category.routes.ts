import express, { NextFunction, Request, Response } from "express"
import { CategoryController } from "./category.controller"
import { fileUploader } from "../../../lib/multer"
import { CategoryValidationSchema } from "./category.contance"

const router = express.Router()

router.post(
    "/create-category",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = CategoryValidationSchema.createCategory.parse(JSON.parse(req.body.data))
        return CategoryController.insertInoDB(req, res, next)
    }

)

export const CategoryRouters = router