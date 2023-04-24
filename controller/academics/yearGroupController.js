const AsyncHandler = require('express-async-handler');
const YearGroup = require("../../models/Academic/YearGroup");

const Admin = require("../../models/staff/Admin");

exports.CreateYearGroup = AsyncHandler(async (req, res) => {
    const { name, academicYear } = req.body;

    // check if year group already exists
    const yearGroup = await YearGroup.findOne({ name });
    if (yearGroup) {
        throw new Error("YearGroups/Graduation already exists");
    }

    // create year group
    const newYearGroup = await YearGroup.create({
        name,
        academicYear,
        createdBy: req.userAuth._id
    });

    //find admin
    const admin = await Admin.findById(req.userAuth._id);
    if(!admin){
        throw new Error("admin not found");
    }
    //push yearGroup to admin and save
    admin.yearGroups.push(newYearGroup._id);
    await admin.save();

    res.status(201).json({
        status: "success",
        message: "Year Group created successfully",
        data: newYearGroup
    });
});

exports.getYearGroups = AsyncHandler(async (req, res) => {
    const yearGroups = await YearGroup.find().select("-createdAt -updatedAt");
    res.status(201).json({
        status: "success",
        data: yearGroups
    });
});

exports.getYearGroup = AsyncHandler(async (req, res) => {
    const yearGroup = await YearGroup.findById(req.params.id).select("-createdAt -updatedAt");
    res.status(201).json({
        status: "success",
        data: yearGroup
    });
});

exports.updateYearGroup = AsyncHandler(async (req, res) => {
    const { name, academicYear } = req.body;
    //check name if already exists
    const createYearGroupFound = await YearGroup.findOne({ name });
    if (createYearGroupFound) {
        throw new Error("YearGroup already exists");
    }
    const yearGroup = await YearGroup.findByIdAndUpdate(
        req.params.id,
        {
            name,
            academicYear,
            createdBy: req.userAuth._id
        },
        { new: true, runValidators: true }
    );
    if (!yearGroup) {
        throw new Error("YearGroup not found");
    }
    await yearGroup.save();
    res.status(201).json({
        status: "success",
        message: "YearGroup updated successfully",
        data: yearGroup
    });
});

exports.deleteYearGroup = AsyncHandler(async (req, res) => {
    const yearGroup = await YearGroup.findByIdAndDelete(req.params.id);
    if (!yearGroup) {
        throw new Error("YearGroup not found");
    }
    res.status(201).json({
        status: "success",
        message: "YearGroup deleted successfully"
    });
});