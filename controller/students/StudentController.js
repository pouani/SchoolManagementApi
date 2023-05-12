const AsyncHandler = require('express-async-handler');
const Student = require('../../models/Staff/Student');
const { hashPassword, isPassMatched } = require('../../utils/helpers');
const generateToken = require('../../utils/generateToken');


//@desc Register Admin Student
//@route POST /api/v1/students/admin/register
//@access Private admin only
exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //check if teacher already exists
    const student = await Student.findOne({ email });
    if(student){
        throw new Error("Student already Exists");
    }

    //hash password
    const hashedPassword = await hashPassword(password);
    //create teacher
    const studentCreated = await Student.create({
        name,
        email,
        password: hashedPassword
    });

    //teacher data
    res.status(200).json({
        status: "success",
        message: "Student registered successfully",
        data: studentCreated
    })
});

//@desc Login Student
//@route POST /api/v1/students/login
//@access Public
exports.loginStudent = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //find user
    const student = await Student.findOne({ email });
    if(!student){
        return res.json({ message: "Invalid login credentials" });
    }

    //verify password
    const isMatched = await isPassMatched(password, student?.password);
    if(!isMatched){
        return res.json({ message: "Invalid login credentials" });
    }else{
        return res.json({
            status: "success",
            message: "Student login successfully",
            data: generateToken(student?._id)
        });
    }
});

//@desc Student profile
//@route GET /api/v1/students/profile
//@access Private student only
exports.getStudentProfile = AsyncHandler(async (req, res) =>{
    const student = await Student.findById(req.userAuth?._id).select("-password -createdAt -updatedAt")

    if(!student){
        throw new Error("Teacher not find");
    }
    return res.json({
        status: "success",
        message: "Student profile fetching",
        data: student
    });
});

//@desc Get all Student
//@route GET /api/v1/students
//@access Private admin only
exports.getAllStudentAdmin = AsyncHandler(async (req, res) =>{
    const student = await Student.find();
    return res.json({
        status: "success",
        message: "All student fetching",
        data: student
    });
});

//@desc Get one Student
//@route GET /api/v1/students/:studentID/admin
//@access Private admin only
exports.getOneStudentAdmin = AsyncHandler(async (req, res) =>{
    const studentID = req.params.studentID;

    //find teacher
    const student = await Student.findById(studentID);
    if(!student){
        throw new Error("Student not founnd");
    }
    return res.json({
        status: "success",
        message: "Student fetching",
        data: student
    });
});


//@desc Update student profile
//@route PUT /api/v1/students/:studentID/update
//@access Private
exports.studentUpdateProfile = AsyncHandler(async (req, res) => {
    const { email, name, password } = req.body;

    //find id from params
    const studentID = req.params.studentID;
    if(studentID !== req.userAuth._id.toString()){
        throw new Error("Student not found");
    }

    //if email exist
    // const emailExist = await Student.findOne({ email });
    // if(emailExist){
    //     throw new Error("email already exists");
    // }

    //check if user is updating password
    if(password){
        //update teacher
        const student = await Student.findByIdAndUpdate(req.userAuth._id, {
            email,
            name,
            password: await hashPassword(password)
        }, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "success",
            data: student,
            message: "student updated successfully"
        })
    }else{
        //update teacher
        const student = await Student.findByIdAndUpdate(req.userAuth._id, {
            email,
            name,
        }, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "success",
            data: student,
            message: "student updated successfully"
        })
    }
});

//@desc Admin updated Student e: assign class
//@route PUT /api/v1/students/:studentID/update/admin
//@access Private Admin only
exports.adminUpdateStudent = AsyncHandler(async (req, res) => {
    const { 
        classLevels, 
        acacademicYear, 
        program, 
        name, 
        email,
        prefectName 
    } = req.body;

    // find student
    const studentFound = await Student.findById(req.params.studentID);
    if(!studentFound){
        throw new Error("Student not found");
    }

    /**
     * L'opérateur $set mettra à jour la valeur de la propriété 
     * classLevels avec la valeur donnée dans le corps de la requête, 
     * tandis que l'opérateur $addToSet ajoutera une nouvelle valeur à la liste classLevels
     */

    const studentUpdate = await Student.findByIdAndUpdate(req.params.studentID, {
        $set:{
            email,
            name,
            classLevels,
            acacademicYear,
            program,
            prefectName
        },

        // $addToSet:{
        //     classLevels,
        // }
    },{
        new: true,
    });

    //response
    res.status(200).json({
        status: "success",
        message: "Student updated successfully",
        data: studentUpdate
    });
});


//@desc Student taking exam
//@route POST /api/v1/students/exam/:examID/write
//@access Private Student only
exports.writeExam = AsyncHandler(async (req, res) => {
    res.json("Student taking exam")
});