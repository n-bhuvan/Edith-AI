import express from "express";
import {
    getStudentsController,
    addStudentController,
    updateStudentController,
    deleteStudentController
} from "../controllers/studentControllers";

import { authMiddleware } from "../middleware/authMiddleware";
import { allowRoles } from "../middleware/roleMiddleware";


const router = express.Router();


router.get(
    "/",
    getStudentsController
);


router.post(
    "/",
    authMiddleware,
    allowRoles("admin"),
    addStudentController
);


router.put(
    "/:id",
    authMiddleware,
    allowRoles("admin"),
    updateStudentController
);


router.delete(
    "/:id",
    authMiddleware,
    allowRoles("admin"),
    deleteStudentController
);


export default router;  