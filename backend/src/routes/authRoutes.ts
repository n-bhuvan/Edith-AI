import express from "express";
import {
    signupController,
    loginController
} from "../controllers/authController";

const router = express.Router();


/*
    Authentication Routes

    POST /auth/signup
    POST /auth/login
*/


// Signup
router.post(
    "/signup",
    signupController
);


// Login
router.post(
    "/login",
    loginController
);


export default router;