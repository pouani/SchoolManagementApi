const express = require('express');
const { 
    CreateAcademicTerm,
    getAcademicTerms,
    getAcademicTerm,
    updateAcademicTerm,
    deleteAcademicTerm,
} = require('../../controller/academics/academicTermController');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

const academicTermRouter = express.Router();

// create academic Term route
// academicTermRouter.post("/", isLogin, isAdmin, CreateAcademicTerm);

// get academic Terms route
// academicTermRouter.get("/", isLogin, isAdmin, getAcademicTerms);

academicTermRouter.route("/")
                .get(isLogin, isAdmin, getAcademicTerms)
                .post(isLogin, isAdmin, CreateAcademicTerm);

// academicTermRouter.get("/:id", isLogin, isAdmin, getAcademicTerm);

// update academic Term route
// academicTermRouter.put("/:id", isLogin, isAdmin, updateAcademicTerm);

// delete academic Term route
// academicTermRouter.delete("/:id", isLogin, isAdmin, deleteAcademicTerm);

academicTermRouter.route("/:id")
                .get(isLogin, isAdmin, getAcademicTerm)
                .put(isLogin, isAdmin, updateAcademicTerm)
                .delete(isLogin, isAdmin, deleteAcademicTerm);

module.exports = academicTermRouter;