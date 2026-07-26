import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chat";


const chatApp = express();


// Middleware
chatApp.use(cors());

chatApp.use(express.json());


// Chat API
chatApp.use("/chat", chatRoutes);



export default chatApp;