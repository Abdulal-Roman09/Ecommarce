import express, { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import auth from "../../middleware/auth";
import { fileUploader } from "../../../lib/multer";
import { BrandController } from "./brand.controller";
import { BrandValidationSchema } from "./brand.validation";

const router = express.Router();

router.get(
    "/",
    auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SUPER_ADMIN),
    BrandController.getAllFromDB
);

router.get(
    "/:id",
    auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SUPER_ADMIN),
    BrandController.getAllFromDB
);

router.post(
    "/create-brand",
    auth(UserRole.ADMIN),
    fileUploader.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        const parsedData = BrandValidationSchema.createBrand.parse(
            JSON.parse(req.body.data)
        );

        req.body = parsedData;
        return BrandController.insertIntoDB(req, res, next);
    }
);

router.delete(
    "/:id",
    auth(UserRole.ADMIN),
    BrandController.deleteFromDB
);

export const BrandRouters = router;