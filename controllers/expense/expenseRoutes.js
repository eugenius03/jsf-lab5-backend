import express from "express";
import { getExpense, createExpense, updateExpense, deleteExpense } from "./expenseController.js";
import { validateExpense } from "../../middleware/validateExpense.js";
import { authRequired } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authRequired, getExpense);
router.post("/", authRequired, validateExpense, createExpense);
router.put("/:id", authRequired, validateExpense, updateExpense);
router.delete("/:id", authRequired, deleteExpense);

export default router;