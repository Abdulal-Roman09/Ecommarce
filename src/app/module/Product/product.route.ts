import auth from '../../middleware/auth'
import { UserRole } from '@prisma/client'
import { fileUploader } from '../../../lib/multer'
import { ProductController } from "./product.controller"
import { ProductValidationSchema } from './product.validation'
import express, { NextFunction, Request, Response } from 'express'

const router = express.Router()

router.post(
    "/create-product",
    fileUploader.upload.single('file'),
    auth(UserRole.VENDOR),
    (req: Request, res: Response, next: NextFunction) => {
        const parsed = JSON.parse(req.body.data);
        const merged = {
            ...parsed,
            initialStock: req.body.initialStock ?? parsed.initialStock,
        };
        req.body = ProductValidationSchema.createProduct.parse(merged)
        return ProductController.insertIntoDB(req, res, next)
    }
)

router.get(
    "/",
    ProductController.getAllFromDB
)

router.delete(
    "/:id",
    ProductController.deleteFromDB
)

router.delete(
    "soft-delete/:id",
    ProductController.softDeleteFromDB
)

export const ProductRouters = router