const express = require('express');

const { 
    createQuestion 
} = require('../../controller/academics/questionController');

const isTeacher = require('../../middlewares/isTeacher');
const isTeacherLogin = require('../../middlewares/isTeacherLogin');

const questionRouter = express.Router();

// create question route
questionRouter.post(
    "/:examID", 
    isTeacherLogin, 
    isTeacher, 
    createQuestion
);


module.exports = questionRouter;