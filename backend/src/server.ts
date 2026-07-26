import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import chatApp from "./chatApp";


const PORT = process.env.PORT || 3000;
const PORT1 = process.env.PORT1 || 5000;


// Main Backend Server
app.listen(PORT, () => {
    console.log(`Main server running on port ${PORT}`);
});


// Chat Server
chatApp.listen(PORT1, () => {
    console.log(`Chat server running on port ${PORT1}`);
});