const express = require('express');
const morgan = require('morgan');

const {globalErrHandler, NotFoundError} = require('../middlewares/globalErrHandler');
const adminRouter = require('../routes/staff/adminRouter');
const teacherRouter = require('../routes/staff/teacherRouter');
const academicYearRouter = require('../routes/academics/academicYearRoute');
const academicTermRouter = require('../routes/academics/academicTermRoute');
const classLevelRouter = require('../routes/academics/classLevelRoute');
const programRouter = require('../routes/academics/programRoute');
const subjectRouter = require('../routes/academics/subjectRoute');
const yearGroupRouter = require('../routes/academics/yearGroupRoute');
const examRouter = require('../routes/academics/examRoute');
const studentRouter = require('../routes/staff/studentRouter');
const questionRouter = require('../routes/academics/questionRoute');

const app = express();

// Middlewares
app.use(express.json()); // for parsing application/json

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.originalUrl}`)
//     next();
// })

// const user = {
//     name: 'david',
//     isAdmin: false,
//     isLogin: true
// };

// const isLogin = (req, res, next) => {
//     if(user.isLogin){
//         next();
//     }else{
//         res.status(401).json({
//             message: "Unauthorized"
//         })
//     }
// };

// const isAdmin = (req, res, next) => {
//     if(user.isAdmin){
//         next();
//     }else{
//         res.status(401).json({
//             message: "Unauthorized, you are not admin"
//         })
//     }
// };

// app.use(isLogin, isAdmin);

//admin register
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/year-groups", yearGroupRouter);
app.use("/api/v1/exams", examRouter);
app.use("/api/v1/questions", questionRouter);

//Error middlewares
app.use(NotFoundError);
app.use(globalErrHandler)

module.exports = app;