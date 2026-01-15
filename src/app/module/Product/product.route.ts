import express, { NextFunction, Request, Response } from 'express'
import { ProductController } from "./product.controller"
import { fileUploader } from '../../../lib/multer'
import { ProductValidationSchema } from './product.validation'

const router = express.Router()

router.post(
    "/create-Product",
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = ProductValidationSchema.createProduct.parse(JSON.parse(req.body.data))
        return ProductController.insertIntoDB(req, res, next)
    }
)

export const ProductRouters = router