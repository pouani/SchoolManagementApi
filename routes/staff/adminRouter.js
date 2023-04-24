const express = require('express');
const app = require('../../app/app');
const { 
    registerAdminController ,
    loginAdminController,
    getAdmins,
    getAdminProfileController,
    updateAdmin,
    deleteAdmin,
    adminSuspendTeacherController,
    adminUnsuspendTeacherController,
    adminWithdrawTeacherController,
    adminUnwithdrawTeacherController,
    adminPublichExamController,
    adminUnpublichExamController
} = require('../../controller/staff/adminController');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');

const adminRouter = express.Router();

// admin register
adminRouter.post("/register", registerAdminController);

// admin login
adminRouter.post("/login", loginAdminController);

// get all admins
adminRouter.get("/", isLogin, getAdmins)

// get one admin
adminRouter.get("/profile", isLogin, isAdmin, getAdminProfileController);

// update admin
adminRouter.put("/", isLogin, isAdmin, updateAdmin);

// delete admin
adminRouter.delete("/:id", isLogin, isAdmin, deleteAdmin);

// admin suspending teacher
adminRouter.put("/suspend/teacher/:id", adminSuspendTeacherController);

// admin Unsuspending teacher
adminRouter.put("/unsuspend/teacher/:id", adminUnsuspendTeacherController);

// admin withdrawing teacher
adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacherController);

// admin Unwithdrawing teacher
adminRouter.put("/unwithdraw/teacher/:id", adminUnwithdrawTeacherController);

// admin publish exam results
adminRouter.put("/publish/exam/:id", adminPublichExamController);

// admin unpublish exam results
adminRouter.put("/unpublish/exam/:id", adminUnpublichExamController);

module.exports = adminRouter;