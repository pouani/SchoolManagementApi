const express = require('express');
const app = require('../../app/app');
const { 
    adminRegisterStudent,
    loginStudent,
    getAllStudentAdmin,
    getStudentProfile,
    getOneStudentAdmin,
    studentUpdateProfile,
    adminUpdateStudent
} = require('../../controller/students/StudentController');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const isStudentLogin = require('../../middlewares/isStudentLogin');
const isStudent = require('../../middlewares/isStudent');

const studentRouter = express.Router();

// student register
studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.get("/admin", isLogin, isAdmin, getAllStudentAdmin);
studentRouter.get("/:studentID/admin", isLogin, isAdmin, getOneStudentAdmin);
studentRouter.put("/:studentID/update", isStudentLogin, isStudent, studentUpdateProfile);
studentRouter.put("/:studentID/update/admin", isLogin, isAdmin, adminUpdateStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/profile", isStudentLogin, isStudent, getStudentProfile);


module.exports = studentRouter;