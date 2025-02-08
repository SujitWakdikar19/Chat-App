import dotenv from "dotenv";
dotenv.config(); // Load environment variables first

import express from "express";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
export const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};
app.use(cors(corsOptions)); 

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Connect to Database before starting the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(` Server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(" Failed to connect to database:", err);
        process.exit(1); // Exit the process if DB connection fails
    });
