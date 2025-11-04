import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Mongo error:", err);
        throw err;
    }
};