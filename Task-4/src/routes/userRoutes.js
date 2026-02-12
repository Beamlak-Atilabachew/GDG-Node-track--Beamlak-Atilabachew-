import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

//get all users
router.get("/", userController.getAllUser);
//get user by ID
router.get("/:id", userController.getUserById);
//Create a new user
router.post("/", userController.createNewUser);
// Update a user by ID
router.put("/:id", userController.updateUserById);
// Delete a user by ID
router.delete("/:id", userController.deleteUserById);

export default router;