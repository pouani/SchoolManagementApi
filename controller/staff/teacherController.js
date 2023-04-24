const AsyncHandler = require('express-async-handler');
const Teacher = require('../../models/Staff/Teacher');
const { hashPassword, isPassMatched } = require('../../utils/helpers');
const generateToken = require('../../utils/generateToken');

//@desc Register Admin Teacher
//@route POST /api/v1/teachers/admin/register
//@access Private admin only
exports.adminRegisterTeacher = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //check if teacher already exists
    const teacher = await Teacher.findOne({ email });
    if(teacher){
        throw new Error("Teacher already Exists");
    }

    //hash password
    const hashedPassword = await hashPassword(password);
    //create teacher
    const teacherCreated = await Teacher.create({
        name,
        email,
        password: hashedPassword
    });

    //teacher data
    res.status(200).json({
        status: "success",
        message: "Teacher registered successfully",
        data: teacherCreated
    })
});

//@desc Login Teacher
//@route POST /api/v1/teachers/login
//@access Public
exports.loginTeacher = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //find user
    const teacher = await Teacher.findOne({ email });
    if(!teacher){
        return res.json({ message: "Invalid login credentials" });
    }
    //verify password
    const isMatched = await isPassMatched(password, teacher?.password);
    if(!isMatched){
        return res.json({ message: "Invalid login credentials" });
    }else{
        return res.json({
            status: "success",
            message: "Teacher login successfully",
            data: generateToken(teacher?._id)
        });
    }
});

//@desc Get all Teacher
//@route GET /api/v1/teachers
//@access Private admin only
exports.getAllTeachersAdmin = AsyncHandler(async (req, res) =>{
    const teachers = await Teacher.find();
    return res.json({
        status: "success",
        message: "All teachers fetching",
        data: teachers
    });
});

//@desc Get one Teacher
//@route GET /api/v1/teachers/:teacherId/admin
//@access Private admin only
exports.getOneTeacherAdmin = AsyncHandler(async (req, res) =>{
    const teacherID = req.params.teacherID;

    //find teacher
    const teacher = await Teacher.findById(teacherID);
    if(!teacher){
        throw new Error("Teacher not find");
    }
    return res.json({
        status: "success",
        message: "Teacher fetching",
        data: teacher
    });
});

//@desc Teacher profile
//@route GET /api/v1/teachers/profile
//@access Private teachers only
exports.getTeacherProfile = AsyncHandler(async (req, res) =>{
    const teacher = await Teacher.findById(req.userAuth?._id).select("-password -createdAt -updatedAt")

    if(!teacher){
        throw new Error("Teacher not find");
    }
    return res.json({
        status: "success",
        message: "Teacher fetching",
        data: teacher
    });
});

//@desc Update teacher profile
//@route PUT /api/v1/teachers/:teacherID/update
//@access Private
exports.teacherUpdateProfile = AsyncHandler(async (req, res) => {
    const { email, name, password } = req.body;

    //if email exist
    const emailExist = await Teacher.findOne({ email });
    if(emailExist){
        throw new Error("email already exists");
    }
    //hash password

    //check if user is updating password
    if(password){
        //update teacher
        const teacher = await Teacher.findByIdAndUpdate(req.userAuth._id, {
            email,
            name,
            password: await hashPassword(password)
        }, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "success",
            data: teacher,
            message: "teacher updated successfully"
        })
    }else{
        //update teacher
        const teacher = await Teacher.findByIdAndUpdate(req.userAuth._id, {
            email,
            name,
        }, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "success",
            data: teacher,
            message: "teacher updated successfully"
        })
    }
});

//@desc Admin Update teacher profile
//@route PUT /api/v1/teachers/:teacherID/admin
//@access Private
exports.adminUpdateProfile = AsyncHandler(async (req, res) => {
    const { program, classLevel, academicYear, subject } = req.body;

    //if email exist
    const teacherFound = await Teacher.findById(req.params.teacherID);
    if(!teacherFound){
        throw new Error("Teacher not found");
    }
    //check if teacher is withdrawn
    if(teacherFound.isWitdwrawn){
        throw new Error("Action denied, teacher is withdrawn");
    }

    //assign a program
    if(program){
        teacherFound.program = program;
        await teacherFound.save();
        res.status(200).json({
            status: "success",
            data: teacherFound,
            message: "teacher updated successfully"
        })
    }

    //assign a class level
    if(classLevel){
        teacherFound.classLevel = classLevel;
        await teacherFound.save();
        res.status(200).json({
            status: "success",
            data: teacherFound,
            message: "teacher updated successfully"
        })
    }

    //assign a subject
    if(subject){
        teacherFound.subject = subject;
        await teacherFound.save();
        res.status(200).json({
            status: "success",
            data: teacherFound,
            message: "teacher updated successfully"
        })
    }

    //assign academic year
    if(academicYear){
        teacherFound.academicYear = academicYear;
        await teacherFound.save();
        res.status(200).json({
            status: "success",
            data: teacherFound,
            message: "teacher updated successfully"
        })
    }
});
