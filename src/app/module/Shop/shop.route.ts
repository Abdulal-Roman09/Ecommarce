import express from 'express';
import { fileUploader } from '../../../lib/multer';
import auth from '../../middleware/auth';
import { UserRole } from '@prisma/client';
import { ShopController } from './shop.controller';
import { ShopValidationSchema } from './shop.validation';

const router = express.Router();

router.post(
    '/create-shop',
    fileUploader.upload.array('file', 2),
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    (req, res, next) => {
        const validatedData = ShopValidationSchema.createShop.parse(JSON.parse(req.body.data));
        req.body = validatedData;
        return ShopController.insertIntoDB(req, res, next);
    }
);

router.get(
    '/',
    ShopController.getAllFromDB
);

router.delete(
    '/soft-delete/:id',
    ShopController.softDeleteFromDB
);

export const ShopRouters = router;