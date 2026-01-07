import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const route = express.Router()

route.post(
    "/create-admin",
    auth(UserRole.ADMIN),
    UserController.createAdmin
)

route.post(
    "/create-vendor",
    UserController.createVendor
)


export const UserRoutes = route