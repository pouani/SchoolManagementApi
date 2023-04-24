const AsyncHandler = require('express-async-handler');
const AcademicTerm = require("../../models/Academic/AcademicTerm");

const Admin = require("../../models/staff/Admin");

exports.CreateAcademicTerm = AsyncHandler(async (req, res) => {
    const { name, description } = req.body;

    // check if academic year already exists
    const academicTerm = await AcademicTerm.findOne({ name });
    if (academicTerm) {
        throw new Error("Academic Terms already exists");
    }

    // create academic year
    const newAcademicTerm = await AcademicTerm.create({
        name,
        description,
        createdBy: req.userAuth._id
    });

    //push academic year to admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicTerms.push(newAcademicTerm._id);
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Academic Term created successfully",
        data: newAcademicTerm
    });
});

exports.getAcademicTerms = AsyncHandler(async (req, res) => {
    const academicTerms = await AcademicTerm.find().select("-createdAt -updatedAt");
    res.status(201).json({
        status: "success",
        data: academicTerms
    });
});

exports.getAcademicTerm = AsyncHandler(async (req, res) => {
    const academicTerm = await AcademicTerm.findById(req.params.id).select("-createdAt -updatedAt");
    res.status(201).json({
        status: "success",
        data: academicTerm
    });
});

exports.updateAcademicTerm = AsyncHandler(async (req, res) => {
    const { name, description } = req.body;
    //check name if already exists
    const createAcademicTermFound = await AcademicTerm.findOne({ name });
    if (createAcademicTermFound) {
        throw new Error("Academic Term already exists");
    }
    const academicTerm = await AcademicTerm.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            createdBy: req.userAuth._id
        },
        { new: true, runValidators: true }
    );
    if (!academicTerm) {
        throw new Error("Academic Term not found");
    }
    await academicTerm.save();
    res.status(201).json({
        status: "success",
        message: "Academic Term updated successfully",
        data: academicTerm
    });
});

exports.deleteAcademicTerm = AsyncHandler(async (req, res) => {
    const academicTerm = await AcademicTerm.findByIdAndDelete(req.params.id);
    if (!academicTerm) {
        throw new Error("Academic Term not found");
    }
    res.status(201).json({
        status: "success",
        message: "Academic Term deleted successfully"
    });
});