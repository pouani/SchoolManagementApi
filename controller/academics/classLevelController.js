const AsyncHandler = require('express-async-handler');
const ClassLevel = require("../../models/Academic/ClassLevel");

const Admin = require("../../models/staff/Admin");

exports.CreateClassLevel = AsyncHandler(async (req, res) => {
    const { name, description } = req.body;

    // check if academic year already exists
    const classLevel = await ClassLevel.findOne({ name });
    if (classLevel) {
        throw new Error("Class Levels already exists");
    }

    // create academic year
    const newClassLevel = await ClassLevel.create({
        name,
        description,
        createdBy: req.userAuth._id
    });

    //push academic year to admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.classLevels.push(newClassLevel._id);
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Class Level created successfully",
        data: newClassLevel
    });
});

exports.getClassLevels = AsyncHandler(async (req, res) => {
    const classLevels = await ClassLevel.find().select("-createdAt -updatedAt");
    res.status(201).json({
        status: "success",
        data: classLevels
    });
});

exports.getClassLevel = AsyncHandler(async (req, res) => {
    const classLevel = await ClassLevel.findById(req.params.id).select("-createdAt -updatedAt");
    res.status(201).json({
        status: "success",
        data: classLevel
    });
});

exports.updateClassLevel = AsyncHandler(async (req, res) => {
    const { name, description } = req.body;
    //check name if already exists
    const createClassLevelFound = await ClassLevel.findOne({ name });
    if (createClassLevelFound) {
        throw new Error("Class Level already exists");
    }
    const classLevel = await ClassLevel.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            createdBy: req.userAuth._id
        },
        { new: true, runValidators: true }
    );
    if (!classLevel) {
        throw new Error("Class Level not found");
    }
    await classLevel.save();
    res.status(201).json({
        status: "success",
        message: "Class Level updated successfully",
        data: classLevel
    });
});

exports.deleteClassLevel = AsyncHandler(async (req, res) => {
    const classLevel = await ClassLevel.findByIdAndDelete(req.params.id);
    if (!classLevel) {
        throw new Error("Class Level not found");
    }
    res.status(201).json({
        status: "success",
        message: "Class Level deleted successfully"
    });
});