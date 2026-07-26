import { supabase } from "../config/db";


/* ===========================
   CREATE STUDENT
=========================== */
export const createStudent = async (studentData: any) => {

    const { Name, age, email } = studentData;


    if (!Name) {
        throw new Error("Student name is required");
    }


    if (age === undefined || age < 5 || age > 20) {
        throw new Error("Age must be between 5 and 20");
    }


    const { data, error } = await supabase
        .from("student")
        .insert([
            {
                Name,
                age,
                email,
            },
        ])
        .select();


    if (error) {
        throw error;
    }


    return data;
};




/* ===========================
   GET ALL STUDENTS
=========================== */
export const getStudents = async () => {

    const { data, error } = await supabase
        .from("student")
        .select("*");


    if (error) {
        throw error;
    }


    return data;
};





/* ===========================
   UPDATE STUDENT
=========================== */
export const updateStudent = async (
    id: string,
    studentData: any
) => {


    const { Name, age, email } = studentData;



    if (!Name) {
        throw new Error("Student name is required");
    }



    if (age === undefined || age < 5 || age > 20) {
        throw new Error("Age must be between 5 and 20");
    }



    const studentId = Number(id);


    if (isNaN(studentId)) {
        throw new Error("Invalid student id");
    }




    // Check student exists

    const { data: existingStudent, error: findError } =
        await supabase
            .from("student")
            .select("*")
            .eq("id", studentId)
            .maybeSingle();



    if (findError) {
        throw findError;
    }



    if (!existingStudent) {
        throw new Error("Student not found");
    }





    // Update

    const { data, error } = await supabase
        .from("student")
        .update({
            Name,
            age,
            email,
        })
        .eq("id", studentId)
        .select();



    if (error) {
        throw error;
    }


    return data;

};






/* ===========================
   DELETE STUDENT
=========================== */
export const deleteStudent = async (id: string) => {


    const studentId = Number(id);



    if (isNaN(studentId)) {
        throw new Error("Invalid student id");
    }



    const { data: existingStudent, error: findError } =
        await supabase
            .from("student")
            .select("*")
            .eq("id", studentId)
            .maybeSingle();



    if (findError) {
        throw findError;
    }



    if (!existingStudent) {
        throw new Error("Student not found");
    }



    const { error } = await supabase
        .from("student")
        .delete()
        .eq("id", studentId);



    if (error) {
        throw error;
    }



    return {
        message: "Student deleted successfully"
    };

};