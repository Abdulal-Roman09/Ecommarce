import express from "express";
import { VendorController } from "./vendor.controller";

const router = express.Router();

router.get(
    "/",
    VendorController.getAllFromDB
);

router.delete(
    "/:id",
    VendorController.deleteFromDB
);

export const VendorRoutes = router;
