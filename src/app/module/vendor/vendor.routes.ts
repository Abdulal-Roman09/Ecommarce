import express from "express";
import { VendorController } from "./vendor.controller";

const router = express.Router();

router.get(
    "/",
    VendorController.getAllFromDB
);

router.get(
    "/:id",
    VendorController.getByIdFromDB
);

router.delete(
    "/:id",
    VendorController.deleteFromDB
);

router.patch(
    "/update/:id",
    VendorController.updateFromDB
);

router.delete(
    "/soft-delete/:id",
    VendorController.softDeleteFromDB
);

export const VendorRoutes = router;
