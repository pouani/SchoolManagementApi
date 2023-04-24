const AsyncHandler = require('express-async-handler');
const Admin = require("../../models/staff/Admin");
const generateToken = require('../../utils/generateToken');
const verifyToken = require('../../utils/verifyToken');
const { hashPassword, isPassMatched } = require('../../utils/helpers');

//@desc Register Admin
//@route POST /api/v1/admin/register
//@access Public
exports.registerAdminController = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // check if admin email already exists
  const adminFound = await Admin.findOne({ email });
  if (adminFound) {
    throw new Error("admin already exists");
  }
  // create admin
  const admin = await Admin.create({
    name,
    email,
    password: await hashPassword(password),
  });
  res.status(201).json({
    status: "success",
    data: admin,
    message: "admin registered successfully",
  });
});

//@desc Login Admin
//@route POST /api/v1/admin/login
//@access Public
exports.loginAdminController = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //find user
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.json({ message: "invalid login credentials" });
    }

    //verify password
    const isMatched = await isPassMatched(password, user.password);

    if(!isMatched) {
        return res.json({ message: "invalid login credentials" });
    }else{
        return res.json({ 
            data: generateToken(user._id),
            message: "admin logged in successfully"
        });
    }
});

//@desc Get all admins
//@route GET /api/v1/admins
//@access Private
exports.getAdmins = AsyncHandler(async (req, res) => {
    const admins = await Admin.find().select("-password -createdAt -updatedAt");
    res.status(201).json({
        status: "success",
        message: "admins fetched successfully",
        data: admins
    });
});

//@desc Get one admin
//@route GET /api/v1/admins/:id
//@access Private
exports.getAdminProfileController = AsyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.userAuth._id)
    .select("-password -createdAt -updatedAt")
    .populate("academicYears");
    if(!admin){
        throw new Error("admin not found");
    }else{
        res.status(201).json({
            status: "success",
            data: admin,
            message: "admin profile fetched successfully"
        });
    }
});

//@desc Update admin
//@route PUT /api/v1/admins/:id
//@access Private
exports.updateAdmin = AsyncHandler(async (req, res) => {
    const { email, name, password } = req.body;

    //if email exist
    const emailExist = await Admin.findOne({ email });
    if(emailExist){
        throw new Error("email already exists");
    }
    //hash password

    //check if user is updating password
    if(password){
        //update admin
        const admin = await Admin.findByIdAndUpdate(req.userAuth._id, {
            email,
            name,
            password: await hashPassword(password)
        }, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "success",
            data: admin,
            message: "admin updated successfully"
        })
    }else{
        //update admin
        const admin = await Admin.findByIdAndUpdate(req.userAuth._id, {
            email,
            name,
        }, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "success",
            data: admin,
            message: "admin updated successfully"
        })
    }
        
    
});

//@desc Delete admin
//@route DELETE /api/v1/admins/:id
//@access Private
exports.deleteAdmin = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "admin deleted successfully"
        });
    } catch (error) {
        res.json({
            status: "failed",
            data: error.message,
        })
    }
}

//@desc Admin suspending teacher
//@route PUT /api/v1/admin/suspend/teacher/:id
//@access Private
exports.adminSuspendTeacherController = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "admin suspended teacher successfully"
        });
    } catch (error) {
        res.json({
            status: "failed",
            data: error.message,
        })
    }
}

//@desc Admin Unsuspending teacher
//@route PUT /api/v1/admin/unsuspend/teacher/:id
//@access Private
exports.adminUnsuspendTeacherController = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "admin unsuspended teacher successfully"
        });
    } catch (error) {
        res.json({
            status: "failed",
            data: error.message,
        })
    }
}

//@desc Admin withdrawing teacher
//@route PUT /api/v1/admin/withdraw/teacher/:id
//@access Private
exports.adminWithdrawTeacherController = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "admin withdraw teacher successfully"
        });
    } catch (error) {
        res.json({
            status: "failed",
            data: error.message,
        })
    }
};

//@desc Admin Unwithdrawing teacher
//@route PUT /api/v1/admin/unwithdraw/teacher/:id
//@access Private
exports.adminUnwithdrawTeacherController = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "admin unwithdraw teacher successfully"
        });
    } catch (error) {
        res.json({
            status: "failed",
            data: error.message,
        })
    }
};

//@desc Admin Publish Exam
//@route PUT /api/v1/admins/publish/exam/:id
//@access Private
exports.adminPublichExamController = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "admin publish exam successfully"
        });
    } catch (error) {
        res.json({
            status: "failed",
            data: error.message,
        })
    }
}

//@desc Admin Unpublish Exam
//@route PUT /api/v1/admins/unpublish/exam/:id
//@access Private
exports.adminUnpublichExamController = (req, res) => {
    try {
        res.status(201).json({
            status: "success",
            data: "admin unpublish exam successfully"
        });
    } catch (error) {
        res.json({
            status: "failed",
            data: error.message,
        })
    }
};