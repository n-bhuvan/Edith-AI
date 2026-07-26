import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET;


if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in .env");
}


/* ===========================
   GENERATE JWT
=========================== */
export const generateToken = (payload: any) => {

    return jwt.sign(
        payload,
        JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );

};



/* ===========================
   VERIFY JWT
=========================== */
export const verifyToken = (token: string) => {

    return jwt.verify(
        token,
        JWT_SECRET
    );

};