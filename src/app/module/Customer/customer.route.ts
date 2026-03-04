import express from "express";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { CustomerController } from "./customer.controller";

const router = express.Router();

router.get(
    "/",
    auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SUPER_ADMIN),
    CustomerController.getAllFromDB
);

router.get(
    "/:id",
    auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SUPER_ADMIN),
    CustomerController.singleFromDB
);

router.patch(
    "/update/:id",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    CustomerController.updateFromDB
);

router.delete(
    "/:id",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    CustomerController.deleteFromDB
);

router.delete(
    "/soft-delete/:id",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    CustomerController.softDeleteFromDB
);

export const CustomerRouters = router;