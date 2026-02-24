import express from "express";
import { WishlistController } from "./wishlist.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";


const router = express.Router();

router.post(
    "/add-wishlist/:id",
    auth(UserRole.CUSTOMER, UserRole.ADMIN),
    WishlistController.insertIntoDB
);

router.post(
    "/remove-wishlist/:id",
    auth(UserRole.CUSTOMER, UserRole.ADMIN),
    WishlistController.deleteFromDB
);

router.get(
    "/",
    auth(UserRole.CUSTOMER),
    WishlistController.getAllFromDB
)


export const WishlistRoutes = router;
