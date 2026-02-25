import express from "express";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { OrderController } from "./order.controller";


const router = express.Router();

router.post(
    "/creat-order/:id",
    auth(UserRole.CUSTOMER, UserRole.ADMIN),
    OrderController.insertIntoDB
);

router.get(
    "/",
    auth(UserRole.CUSTOMER, UserRole.ADMIN),
    OrderController.getAllFromDB
);


export const OrderRoutes = router;
