import express from "express";
import { getUser, createUser, updateUser, deleteUser } from "./userController.js";
import { validateUser } from "../../middleware/validateUser.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", authMiddleware, getUser);
router.post("/", validateUser, createUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;