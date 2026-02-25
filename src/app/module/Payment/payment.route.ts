import express from "express";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";
import { PaymentsController } from "./payment.controller";


const router = express.Router();

router.post(
    "/creat-payments/:id",
    auth(UserRole.CUSTOMER, UserRole.ADMIN),
    PaymentsController.insertIntoDB
);

router.get(
    "/",
    auth(UserRole.CUSTOMER, UserRole.ADMIN),
    PaymentsController.getAllFromDB
);


export const PaymentsRoutes = router;
