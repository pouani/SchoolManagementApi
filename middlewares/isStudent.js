const Admin = require("../models/staff/Admin");
const Student = require('../models/Staff/Student');

const isStudent = async (req, res, next) => {
    //find the user
    const userId = req.userAuth?._id;
    const studentFound = await Student.findById(userId);
    //check if user is admin
    if(studentFound?.role === 'student'){
        next();
    }else{
        const err = new Error("Access denied, only students can access this route");
        next(err);
    }
};

module.exports = isStudent;