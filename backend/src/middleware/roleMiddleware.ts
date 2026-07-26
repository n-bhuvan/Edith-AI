import { Request, Response, NextFunction } from "express";

export const allowRoles = (...roles: string[]) => {

    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const user = (req as any).user;


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }


        if (!roles.includes(user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You do not have permission."
            });
        }


        next();
    };
};