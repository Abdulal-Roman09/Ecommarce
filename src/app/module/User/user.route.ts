import express from "express";
import { UserController } from "./user.controller";

const route = express.Router()

route.post("/create-user", UserController.createUser)
route.get("/", UserController.getAllUser)

export const UserRoutes = route