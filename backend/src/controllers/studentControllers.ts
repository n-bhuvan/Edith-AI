import { Request, Response } from "express";
import {
    createStudent,
    getStudents,
    updateStudent,
    deleteStudent,
} from "../services/studentService";

/* ===========================
   GET ALL STUDENTS
=========================== */
export const getStudentsController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const students = await getStudents();

        res.status(200).json({
            success: true,
            data: students,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ===========================
   ADD STUDENT
=========================== */
export const addStudentController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const student = await createStudent(req.body);

        res.status(201).json({
            success: true,
            data: student,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/* ===========================
   UPDATE STUDENT
=========================== */
export const updateStudentController = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const id = req.params.id;

        const updatedStudent = await updateStudent(id, req.body);

        res.status(200).json({
            success: true,
            data: updatedStudent,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/* ===========================
   DELETE STUDENT
=========================== */
export const deleteStudentController = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const id = req.params.id;

        const result = await deleteStudent(id);

        res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};