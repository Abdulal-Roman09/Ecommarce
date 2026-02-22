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
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    ShopController.getAllFromDB
);

router.get(
    '/:id',
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.CUSTOMER, UserRole.VENDOR),
    ShopController.getSingleFromDB
);

router.patch(
    '/update/:id',
    fileUploader.upload.array('file', 2),
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.VENDOR),
    (req, res, next) => {
        const validatedData = ShopValidationSchema.updateSchema.parse(JSON.parse(req.body.data));
        req.body = validatedData;
        return ShopController.updateFromDB(req, res, next);
    }
);

router.delete(
    '/soft-delete/:id',
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    ShopController.softDeleteFromDB
);

router.put(
    '/verifed/:id',
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    ShopController.verifedShop
);

router.put(
    '/blocked/:id',
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    ShopController.blockedShop
);

export const ShopRouters = router;