const express = require('express');
const { 
    CreateSubject,
    getSubjects,
    getSubject,
    updateSubject,
    deleteSubject,
} = require('../../controller/academics/subjectController');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

const subjectRouter = express.Router();

subjectRouter.post("/:programID", isLogin, isAdmin, CreateSubject)
subjectRouter.get("/", isLogin, isAdmin, getSubjects)

subjectRouter.get("/:id", isLogin, isAdmin, getSubject)

subjectRouter.put("/:id", isLogin, isAdmin, updateSubject)

subjectRouter.delete("/:id", isLogin, isAdmin, deleteSubject)


module.exports = subjectRouter;