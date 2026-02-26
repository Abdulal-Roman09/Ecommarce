import express from "express";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { VendorController } from "./vendor.controller";

const router = express.Router();

router.get(
    "/",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.CUSTOMER, UserRole.VENDOR),
    VendorController.getAllFromDB
);

router.get(
    "/:id",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.CUSTOMER, UserRole.VENDOR),
    VendorController.getByIdFromDB
);

router.delete(
    "/:id",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    VendorController.deleteFromDB
);

router.patch(
    "/update/:id",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.VENDOR),
    VendorController.updateFromDB
);

router.delete(
    "/soft-delete/:id",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    VendorController.softDeleteFromDB
);

export const VendorRoutes = router;
