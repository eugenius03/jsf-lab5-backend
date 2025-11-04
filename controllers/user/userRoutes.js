import express from "express";
import { getUser, createUser, updateUser, deleteUser } from "./userController.js";
import { validateUser } from "../../middleware/validateUser.js";

const router = express.Router();

router.get("/", getUser);
router.post("/", validateUser, createUser);
router.put("/:id", validateUser, updateUser);
router.delete("/:id", deleteUser);

export default router;