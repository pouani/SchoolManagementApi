const express = require('express');
const { 
    CreateAcademicYear,
    getAcademicYears,
    getAcademicYear,
    updateAcademicYear,
    deleteAcademicYear,
} = require('../../controller/academics/academicYearController');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

const academicYearRouter = express.Router();

// create academic year route
// academicYearRouter.post("/", isLogin, isAdmin, CreateAcademicYear);

// get academic years route
// academicYearRouter.get("/", isLogin, isAdmin, getAcademicYears);

academicYearRouter.route("/")
                .get(isLogin, isAdmin, getAcademicYears)
                .post(isLogin, isAdmin, CreateAcademicYear);

// academicYearRouter.get("/:id", isLogin, isAdmin, getAcademicYear);

// update academic year route
// academicYearRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);

// delete academic year route
// academicYearRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

academicYearRouter.route("/:id")
                .get(isLogin, isAdmin, getAcademicYear)
                .put(isLogin, isAdmin, updateAcademicYear)
                .delete(isLogin, isAdmin, deleteAcademicYear);

module.exports = academicYearRouter;