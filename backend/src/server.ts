import dotenv from "dotenv";

dotenv.config();


import express from "express";
import studentRoutes from "./routes/studentRoutes";
import authRoutes from "./routes/authRoutes";


const app = express();


// ===========================
// Middleware
// ===========================
app.use(express.json());



// ===========================
// Test API
// ===========================
app.get("/hello", (req, res) => {

    res.json({
        message: "Hello World"
    });

});



// ===========================
// Authentication Routes
// ===========================
app.use("/auth", authRoutes);



// ===========================
// Student Routes
// ===========================
app.use("/students", studentRoutes);



// ===========================
// Global Error Handler
// ===========================
app.use(
    (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
);



// ===========================
// Server Start
// ===========================

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);

});