const AsyncHandler = require('express-async-handler');
const Teacher = require('../../models/Staff/Teacher');
const Exam = require("../../models/Academic/Exam");
const { json } = require('express');

//@desc Create Exam
//@route POST /api/v1/exams
//@access Private teachers only
exports.createExam = AsyncHandler(async(req, res) => {
    const { 
        name, 
        description, 
        subject, 
        program, 
        academicTerm,
        duration,
        examDate,
        examTime,
        examType,
        examStatus,
        createdBy,
        academicYear,
        classLevel
    } = req.body;

    //find teacher
    const teacherFound = await Teacher.findById(req.userAuth?._id);
    if(!teacherFound){
        throw new Error("Teacher not found");
    }

    //Examen exist
    const examExist = await Exam.findOne({ name });
    if(examExist){
        throw new Error("Examen Already Exist");
    }

    //Create exam
    const createdExam = new Exam({
        name,
        description,
        academicTerm,
        academicYear,
        classLevel,
        createdBy,
        duration,
        examDate,
        examStatus,
        examTime,
        examType,
        subject, 
        program,
        createdBy: req.userAuth._id
    });
    //push the exam into teacher
    teacherFound.examsCreated.push(createdExam._id);
    //save exam
    await createdExam.save();
    await teacherFound.save();
    res.status(200).json({
        status: "success",
        message: "Exam created successfully",
        data: createdExam
    })
});

//@desc get all Exam
//@route GET /api/v1/exams
//@access Private teachers only
exports.getAllExams = AsyncHandler(async(req, res) =>{
    const exams = await Exam.find().populate({
        path: "questions",
        select: "question optionA optionB optionC optionD correctAnswer isCorrect",
        populate: {
            path: "createdBy",
        }
    })
    return res.status(201).json({
        status: "success",
        message: "All exams fetched successfully",
        data: exams
    });
});

//@desc get One Exam
//@route GET /api/v1/exams/:id
//@access Private teachers only
exports.getOneExam = AsyncHandler(async(req, res) =>{
    const exam = await Exam.findById(req.params.id);
    return res.status(201).json({
        status: "success",
        message: "Exam fetched successfully",
        data: exam
    });
});

//@desc update Exam
//@route UPDATE /api/v1/exams/:id
//@access Private teachers only
exports.updateExam = AsyncHandler(async(req, res)  => {
    const { 
        name, 
        description, 
        subject, 
        program, 
        academicTerm,
        duration,
        examDate,
        examTime,
        examType,
        examStatus,
        createdBy,
        academicYear,
        classLevel
    } = req.body;

    //checked if name exist
    const examFound = await Exam.findOne({ name });
    if(examFound){
        throw new Error("Exam already exist");
    }

    const examUpdate = await Exam.findByIdAndUpdate({
        name, 
        description, 
        subject, 
        program, 
        academicTerm,
        duration,
        examDate,
        examTime,
        examType,
        examStatus,
        createdBy,
        academicYear,
        classLevel,
        createdBy: req.userAuth._id
    },{
        new: true,
    });

    res.status(201).json({
        status: "sucess",
        message: "Exam updated successfully",
        date: examUpdate
    })
});