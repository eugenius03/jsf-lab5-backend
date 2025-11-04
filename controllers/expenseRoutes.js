import express from "express";
import { getExpense, createExpense, updateExpense, deleteExpense } from "./expenseController.js";
import { validateExpense } from "../middleware/validate.js";

const router = express.Router();

router.get("/", getExpense);
router.post("/", validateExpense, createExpense);
router.put("/:id", validateExpense, updateExpense);
router.delete("/:id", deleteExpense);

export default router;