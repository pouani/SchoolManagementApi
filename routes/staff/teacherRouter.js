const express = require('express');
const app = require('../../app/app');
const { 
    adminRegisterTeacher,
    loginTeacher,
    getAllTeachersAdmin,
    getOneTeacherAdmin,
    getTeacherProfile,
    teacherUpdateProfile,
    adminUpdateProfile,
} = require('../../controller/staff/teacherController');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const isTeacher = require('../../middlewares/isTeacher');
const isTeacherLogin = require('../../middlewares/isTeacherLogin');

const teacherRouter = express.Router();

// teacher register
teacherRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teacherRouter.post("/login", loginTeacher);
teacherRouter.get("/admin", isLogin, isAdmin, getAllTeachersAdmin);
teacherRouter.get("/:teacherID/admin", isLogin, isAdmin, getOneTeacherAdmin);
teacherRouter.get("/profile", isTeacherLogin, isTeacher, getTeacherProfile);
teacherRouter.put("/:teacherID/update", isTeacherLogin, isTeacher, teacherUpdateProfile);
teacherRouter.put("/:teacherID/admin", isLogin, isAdmin, adminUpdateProfile);

module.exports = teacherRouter;