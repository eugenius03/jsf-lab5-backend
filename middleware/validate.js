export const validateExpense = (req, res, next) => {

    const { category, amount } = req.body;
    if (!category || typeof category !== "string" || category.trim().length < 2) {
        return res
            .status(400)
            .json({ message: "Invalid expense category. Minimum 2 characters required." });
    }
    if (amount === undefined || typeof amount !== "number" || amount < 0) {
        return res.status(400).json({ message: "Invalid expense amount." });
    }
    next(); // proceed to controller
};