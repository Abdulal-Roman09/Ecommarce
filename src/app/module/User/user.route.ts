import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const route = express.Router()

route.post(
    "/create-user",
    auth(UserRole.ADMIN),
    UserController.createAdmin
)


export const UserRoutes = route