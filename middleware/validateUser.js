export const validateUser = (req, res, next) => {

    const { username, email, password } = req.body;
    if (!username || typeof username !== "string" || username.trim().length < 2) {
        return res
            .status(400)
            .json({ message: "Invalid username. Minimum 2 characters required." });
    }
    if (!email || typeof email !== "string" || !/.+\@.+\..+/.test(email)) {
        return res.status(400).json({ message: "Invalid email address." });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
        return res.status(400).json({ message: "Invalid password. Minimum 6 characters required." });
    }
    next(); // proceed to controller
};