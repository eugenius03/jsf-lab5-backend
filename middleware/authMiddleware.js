import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        // Read token from cookie
        const cookieToken = req.cookies["x-auth-token"];
        
        if (!cookieToken) {
            return res.status(401).json({ message: "No token provided" });
        }
        
        // Remove "Bearer " prefix if present
        const token = cookieToken.startsWith("Bearer ") 
            ? cookieToken.slice(7) 
            : cookieToken;
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default authMiddleware;