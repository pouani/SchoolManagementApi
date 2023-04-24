const AsyncHandler = require('express-async-handler');
const Subject = require("../../models/Academic/Subject");
const Program = require("../../models/Academic/Program");

const Admin = require("../../models/staff/Admin");

exports.CreateSubject = AsyncHandler(async (req, res) => {
    const { name, description, academicTerm } = req.body;
    //find the program
    const programFound = await Program.findById(req.params.programID)
    if (!programFound) {
        throw new Error("Program not found");
    }
    // check if academic year already exists
    const subject = await Subject.findOne({ name });
    if (subject) {
        throw new Error("Subjects already exists");
    }

    // create academic year
    const newSubject = await Subject.create({
        name,
        description,
        academicTerm,
        createdBy: req.userAuth._id
    });

    //push Subject to the program
    // programFound.subjects.push(newSubject._id);
    await programFound.save();

    res.status(201).json({
        status: "success",
        message: "Subject created successfully",
        data: newSubject
    });
});

exports.getSubjects = AsyncHandler(async (req, res) => {
    const subjects = await Subject.find().select("-createdAt -updatedAt");
    res.status(201).json({
        status: "success",
        data: subjects
    });
});

exports.getSubject = AsyncHandler(async (req, res) => {
    const subject = await Subject.findById(req.params.id).select("-createdAt -updatedAt");
    res.status(201).json({
        status: "success",
        data: subject
    });
});

exports.updateSubject = AsyncHandler(async (req, res) => {
    const { name, description, academicTerm } = req.body;
    //check name if already exists
    const createSubjectFound = await Subject.findOne({ name });
    if (createSubjectFound) {
        throw new Error("Subject already exists");
    }
    const subject = await Subject.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            academicTerm,
            createdBy: req.userAuth._id
        },
        { new: true, runValidators: true }
    );
    if (!subject) {
        throw new Error("Subject not found");
    }
    await Subject.save();
    res.status(201).json({
        status: "success",
        message: "Subject updated successfully",
        data: subject
    });
});

exports.deleteSubject = AsyncHandler(async (req, res) => {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
        throw new Error("Subject not found");
    }
    res.status(201).json({
        status: "success",
        message: "Subject deleted successfully"
    });
});