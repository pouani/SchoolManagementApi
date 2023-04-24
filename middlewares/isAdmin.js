const Admin = require("../models/staff/Admin");

const isAdmin = async (req, res, next) => {
    //find the user
    const userId = req.userAuth._id;
    const adminFound = await Admin.findById(userId);

    //check if user is admin
    if(adminFound?.role === 'admin'){
        next();
    }else{
        const err = new Error("Access denied, only admin can access this route");
        next(err);
    }
};

module.exports = isAdmin;