import { Request, Response } from "express";
import { signup, login } from "../services/authService";



/* ===========================
   SIGNUP CONTROLLER
=========================== */
export const signupController = async (
    req: Request,
    res: Response
) => {

    try {

        const result = await signup(req.body);


        return res.status(201).json({

            success: true,

            message: "Signup successful",

            data: result

        });


    } catch (error: unknown) {


        const message =
            error instanceof Error
                ? error.message
                : "Signup failed";



        return res.status(400).json({

            success: false,

            message

        });

    }
};





/* ===========================
   LOGIN CONTROLLER
=========================== */
export const loginController = async (
    req: Request,
    res: Response
) => {

    try {

        const result = await login(req.body);



        return res.status(200).json({

            success: true,

            message: "Login successful",

            data: result

        });


    } catch (error: unknown) {


        const message =
            error instanceof Error
                ? error.message
                : "Login failed";



        return res.status(401).json({

            success: false,

            message

        });

    }
};