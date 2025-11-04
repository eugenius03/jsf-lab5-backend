import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./services/db.js";
import expenseRoutes from "./controllers/expenseRoutes.js";

dotenv.config();
const app = express();

// --- CORS setup (allow only your UI domain) ---
const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:4200";
app.use(
    cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    })
);

// --- Middleware ---
app.use(express.json());

// --- Routes ---
app.use("/expenses", expenseRoutes);

// --- DB Connection ---
connectDB();

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));