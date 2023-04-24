const Admin = require("../models/staff/Admin");
const Teacher = require('../models/Staff/Teacher');

const isTeacher = async (req, res, next) => {
    //find the user
    const userId = req.userAuth?._id;
    const teacherFound = await Teacher.findById(userId);
    //check if user is admin
    if(teacherFound?.role === 'teacher'){
        next();
    }else{
        const err = new Error("Access denied, only teachers can access this route");
        next(err);
    }
};

module.exports = isTeacher;