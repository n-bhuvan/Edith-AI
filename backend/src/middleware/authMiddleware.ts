import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";


// Extend Express Request
interface AuthRequest extends Request {
    user?: any;
}


export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    try {

        // Get token from header
        const authHeader = req.headers.authorization;


        if (!authHeader) {

            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });

        }


        // Expected format:
        // Authorization: Bearer TOKEN

        const [type, token] = authHeader.split(" ");


        if (type !== "Bearer" || !token) {

            return res.status(401).json({
                success: false,
                message: "Invalid token format. Use Bearer <token>"
            });

        }



        // Verify JWT token

        const decoded = verifyToken(token);



        // Store user information
        // Example:
        // {
        //    id: 1,
        //    name: "Admin",
        //    role: "admin"
        // }

        req.user = decoded;



        // Continue request

        next();



    } catch (error: unknown) {


        return res.status(401).json({

            success: false,

            message: "Invalid or expired token."

        });

    }

};