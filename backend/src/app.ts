import express from "express";

import studentRoutes from "./routes/studentRoutes";
import authRoutes from "./routes/authRoutes";


const app = express();


// Middleware
app.use(express.json());


// Test API
app.get("/hello", (req, res) => {

    res.json({
        message: "Main Backend Working"
    });

});


// Authentication APIs
app.use("/auth", authRoutes);


// Student APIs
app.use("/students", studentRoutes);



export default app;