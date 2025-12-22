import express from "express";
import { AuthController } from "./auth.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middleware/auth";


const route = express.Router()

route.post(
    "/login",
    AuthController.login
)

route.post(
    "/refesh-token",
    AuthController.refreshToken
)

route.post(
    "/change-passsword",
    auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SUPER_ADMIN, UserRole.VENDOR),
    AuthController.changePassword
)

route.post(
    "/forget-passsword",
    AuthController.forgetPassword
)


export const AuthRoutes = route