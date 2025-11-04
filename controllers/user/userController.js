import hashMiddleware from "../../middleware/hashMiddleware.js";
import { User } from "../../models/User.js";
export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const createUser = async (req, res) => {
    try {
        req.body.password = await hashMiddleware.hashPassword(req.body.password);
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        // { new: true } returns UPDATED document
        const updated = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updated) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.findByIdAndDelete(id);
        if (!deleted) {
        return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};