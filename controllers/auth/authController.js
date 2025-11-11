import jwt from "jsonwebtoken";
import { User } from "../../models/User.js";
import hashMiddleware from "../../middleware/hashMiddleware.js";

export const verify = async (req, res) => {
    try {
        // req.user is set by authMiddleware
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ 
            user: {
                userId: user._id,
                username: user.username,
                budget: user.budget
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    const passwordMatch = user ? await hashMiddleware.comparePassword(password, user.password) : false;
    if (!user || !passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
        { userId: user.id, username: user.username, budget: user.budget },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    res.cookie("x-auth-token", `Bearer ${token}`,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 86400000 // 1 day
        }
    );
    res.json({ token });
};

export const register = async (req, res) => {
    try {
        req.body.password = await hashMiddleware.hashPassword(req.body.password);
        const user = new User(req.body);
        await user.save();
        const token = jwt.sign(
        { userId: user.id, username: user.username, budget: user.budget },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
        );
        res.cookie("x-auth-token", `Bearer ${token}`,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 86400000 // 1 day
            }
        );
        res.status(201).json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("x-auth-token");
        res.json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};