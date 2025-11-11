import express from "express";
import { login, register, verify, logout } from "./authController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verify", authMiddleware, verify);
router.post("/logout", authMiddleware, logout);

export default router;