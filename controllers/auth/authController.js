import jwt from "jsonwebtoken";
import { User } from "../../models/User.js";
import hashMiddleware from "../../middleware/hashMiddleware.js";
export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    const passwordMatch = user ? await hashMiddleware.comparePassword(password, user.password) : false;
    if (!user || !passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
    res.cookie("x-auth-token", `Bearer ${token}`,
        {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 3600 // 1 hour
        }
    );
    res.json({ token });
};