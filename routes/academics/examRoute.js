const express = require('express');

const { 
    createExam,
    getAllExams,
    getOneExam,
    updateExam
} = require("../../controller/academics/examController");

const isTeacher = require('../../middlewares/isTeacher');
const isTeacherLogin = require('../../middlewares/isTeacherLogin');

const examRouter = express.Router();

examRouter
    .route("/")
    .post(isTeacherLogin, isTeacher, createExam)
    .get(isTeacherLogin, isTeacher, getAllExams);

examRouter
    .route("/:id")
    .get(isTeacherLogin, isTeacher, getOneExam)
    .put(isTeacherLogin, isTeacher, updateExam);

module.exports = examRouter;