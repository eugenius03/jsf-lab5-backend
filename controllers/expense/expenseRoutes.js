import express from "express";
import { getExpense, createExpense, updateExpense, deleteExpense } from "./expenseController.js";
import { validateExpense } from "../../middleware/validateExpense.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getExpense);
router.post("/", authMiddleware, validateExpense, createExpense);
router.put("/:id", authMiddleware, validateExpense, updateExpense);
router.delete("/:id", authMiddleware, deleteExpense);

export default router;