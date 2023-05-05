const Student = require('../models/Staff/Student');
const verifyToken = require("../utils/verifyToken");


const isStudentLogin = async (req, res, next) => {
    //get token from header
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
    //verify token
    const verify = verifyToken(token);
    if(verify){
        const user = await Student.findById(verify.id).select(
            "name email role"
        );
        //save user to req.user
        req.userAuth = user;
        next();
    }else{
        const err = new Error("Token is not valid/Expired");
        next(err);
    }
};

module.exports = isStudentLogin;