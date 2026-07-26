import { Request, Response } from "express";


export const chat = (
    req: Request,
    res: Response
) => {

    const { message } = req.body;


    res.json({
        success: true,
        message: "Chat API working",
        received: message
    });

};