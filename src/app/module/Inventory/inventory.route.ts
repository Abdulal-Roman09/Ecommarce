import express from "express"
import { InventoryController } from "./inventory.controller"

const router = express.Router()

router.post(
    "/add-quantity/:id",
    InventoryController.addQuantity
)

router.post(
    "/remove-quantity/:id",
    InventoryController.removeQuantity
)

router.get(
    "/",
    InventoryController.getAllFromDB
)

export const InventoryRouters = router