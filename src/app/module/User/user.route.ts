import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router()

router.post(
    "/create-admin",
    auth(UserRole.ADMIN),
    UserController.createAdmin
)

router.post(
    "/create-vendor",
    auth(UserRole.ADMIN),
    UserController.createVendor
)

router.post(
    "/create-customer",
    UserController.createCustomer
)


export const UserRoutes = router