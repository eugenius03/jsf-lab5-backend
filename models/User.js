import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
{
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        minlength: [2, "Username must be at least 2 characters long"],
        maxlength: [100, "Username too long"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    budget: {
        type: Number,
        default: null,
    }
},
{ versionKey: false } // disables the "__v" version field
);

export const User = mongoose.model("User", UserSchema);