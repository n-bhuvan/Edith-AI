import { supabase } from "../config/db";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";


/* ===========================
   SIGNUP
=========================== */
export const signup = async (userData: any) => {

    const {
        name,
        age,
        className,
        password,
        role
    } = userData;


    if (!name || !password) {
        throw new Error("Name and password are required");
    }


    const userRole = role || "student";


    if (!["admin", "student"].includes(userRole)) {
        throw new Error("Invalid role");
    }



    // Check existing user

    const { data: existingStudent, error: checkError } =
        await supabase
            .from("test1")
            .select("id")
            .eq("name", name)
            .maybeSingle();



    if (checkError) {
        throw new Error(checkError.message);
    }



    if (existingStudent) {
        throw new Error("User already exists");
    }




    // Hash password

    const hashedPassword = await bcrypt.hash(
        password,
        10
    );




    // Insert user

    const { data, error } = await supabase
        .from("test1")
        .insert([
            {
                name: name,
                age: age,
                className: className,
                password: hashedPassword,
                role: userRole
            }
        ])
        .select();




    if (error) {
        throw new Error(error.message);
    }




    return data;

};





/* ===========================
   LOGIN
=========================== */
export const login = async (userData: any) => {


    const {
        name,
        password
    } = userData;



    if (!name || !password) {
        throw new Error("Name and password are required");
    }




    const { data: student, error } =
        await supabase
            .from("test1")
            .select("*")
            .eq("name", name)
            .maybeSingle();




    if (error) {
        throw new Error(error.message);
    }




    if (!student) {
        throw new Error("User not found");
    }




    const passwordMatch = await bcrypt.compare(
        password,
        student.password
    );




    if (!passwordMatch) {
        throw new Error("Wrong password");
    }




    const token = generateToken({

        id: student.id,

        name: student.name,

        role: student.role

    });




    return {

        message: "Login successful",

        token,


        student: {

            id: student.id,

            name: student.name,

            age: student.age,

            className: student.className,

            role: student.role

        }

    };

};