const AsyncHandler = require('express-async-handler');
const AcademicYear = require("../../models/Academic/AcademicYear");
const Admin = require("../../models/staff/Admin");

exports.CreateAcademicYear = AsyncHandler(async (req, res) => {
    const { name, fromYear, toYear } = req.body;

    // check if academic year already exists
    const academicYear = await AcademicYear.findOne({ name });
    if (academicYear) {
        throw new Error("Academic year already exists");
    }

    // create academic year
    const newAcademicYear = await AcademicYear.create({
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth._id
    });

    //push academic year to admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicYears.push(newAcademicYear._id);
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Academic year created successfully",
        data: newAcademicYear
    });
});

exports.getAcademicYears = AsyncHandler(async (req, res) => {
    const academicYears = await AcademicYear.find().select("-createdAt -updatedAt");
    res.status(201).json({
        status: "success",
        data: academicYears
    });
});

exports.getAcademicYear = AsyncHandler(async (req, res) => {
    const academicYear = await AcademicYear.findById(req.params.id).select("-createdAt -updatedAt");
    res.status(201).json({
        status: "success",
        data: academicYear
    });
});

exports.updateAcademicYear = AsyncHandler(async (req, res) => {
    const { name, fromYear, toYear } = req.body;
    //check name if already exists
    const createAcademicYearFound = await AcademicYear.findOne({ name });
    if (createAcademicYearFound) {
        throw new Error("Academic year already exists");
    }
    const academicYear = await AcademicYear.findByIdAndUpdate(
        req.params.id,
        {
            name,
            fromYear,
            toYear,
            createdBy: req.userAuth._id
        },
        { new: true, runValidators: true }
    );
    if (!academicYear) {
        throw new Error("Academic year not found");
    }
    await academicYear.save();
    res.status(201).json({
        status: "success",
        message: "Academic year updated successfully",
        data: academicYear
    });
});

exports.deleteAcademicYear = AsyncHandler(async (req, res) => {
    const academicYear = await AcademicYear.findByIdAndDelete(req.params.id);
    if (!academicYear) {
        throw new Error("Academic year not found");
    }
    res.status(201).json({
        status: "success",
        message: "Academic year deleted successfully"
    });
});