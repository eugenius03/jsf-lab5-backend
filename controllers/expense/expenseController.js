import { Expense } from "../../models/Expense.js";
export const getExpense = async (req, res) => {
    try {
        const { userId } = req.user;
        const expenses = await Expense.find({ UserId: userId });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const createExpense = async (req, res) => {
    try {
        const { userId } = req.user;
        req.body.UserId = userId;
        const expense = new Expense(req.body);
        await expense.save();
        res.status(201).json(expense);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
};
export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        // { new: true } returns UPDATED document
        const updated = await Expense.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updated) {
        return res.status(404).json({ message: "Expense not found" });
    }
    res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Expense.findByIdAndDelete(id);
        if (!deleted) {
        return res.status(404).json({ message: "Expense not found" });
        }
        res.json({ message: "Expense deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};