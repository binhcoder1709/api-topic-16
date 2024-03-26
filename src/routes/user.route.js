import express from "express";
import {
    addUserController,
    changeStatusController, deleteUserController, getUserByIdController,
    getUsersController,
    updateDataController
} from "../controllers/user.controller.js";
const userRoute = express.Router();

// get users collection data router
userRoute.get("/", getUsersController)

// get user by id router
userRoute.get("/:id", getUserByIdController)

// add users record router
userRoute.post("/create", addUserController)

// change status of record of users collection router
userRoute.patch("/:id", changeStatusController)

// update data of record of users collection router
userRoute.put("/:id", updateDataController)

// delete a record router
userRoute.delete("/:id", deleteUserController)

export default userRoute;