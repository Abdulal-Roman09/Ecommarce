import express from "express"
import { InventorController } from "./inventory.controller"

const router = express.Router()


router.post(
    "/create-inventor",
    InventorController.insertIntoDB
)

export const InventorRouters = router