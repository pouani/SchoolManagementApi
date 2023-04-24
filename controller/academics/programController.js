const AsyncHandler = require('express-async-handler');
const Program = require("../../models/Academic/Program");

const Admin = require("../../models/staff/Admin");

exports.CreateProgram = AsyncHandler(async (req, res) => {
    const { name, description, duration } = req.body;

    // check if academic year already exists
    const program = await Program.findOne({ name });
    if (program) {
        throw new Error("Programs already exists");
    }

    // create academic year
    const newProgram = await Program.create({
        name,
        description,
        duration,
        createdBy: req.userAuth._id
    });

    //push academic year to admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.programs.push(newProgram._id);
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Program created successfully",
        data: newProgram
    });
});

exports.getPrograms = AsyncHandler(async (req, res) => {
    const programs = await Program.find().select("-createdAt -updatedAt");
    res.status(201).json({
        status: "success",
        data: programs
    });
});

exports.getProgram = AsyncHandler(async (req, res) => {
    const program = await Program.findById(req.params.id).select("-createdAt -updatedAt");
    res.status(201).json({
        status: "success",
        data: program
    });
});

exports.updateProgram = AsyncHandler(async (req, res) => {
    const { name, description, duration } = req.body;
    //check name if already exists
    const createProgramFound = await Program.findOne({ name });
    if (createProgramFound) {
        throw new Error("Program already exists");
    }
    const program = await Program.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            duration,
            createdBy: req.userAuth._id
        },
        { new: true, runValidators: true }
    );
    if (!program) {
        throw new Error("Program not found");
    }
    await program.save();
    res.status(201).json({
        status: "success",
        message: "Program updated successfully",
        data: program
    });
});

exports.deleteProgram = AsyncHandler(async (req, res) => {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
        throw new Error("Program not found");
    }
    res.status(201).json({
        status: "success",
        message: "Program deleted successfully"
    });
});