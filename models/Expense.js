import mongoose from "mongoose";
// Define the schema (structure of a document saved to the mongo db)
const ExpenseSchema = new mongoose.Schema(
{
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: 0,
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true, // removes extra spaces
        minlength: [2, "Category must be at least 2 characters long"]
    },
    description: {
        type: String,
        default: "",
        maxlength: [200, "Description too long"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
},
{ versionKey: false } // disables the "__v" version field
);

export const Expense = mongoose.model("Expense", ExpenseSchema);