const mongoose = require('mongoose')

const { Schema } = mongoose;

const SubjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: "Teacher",
        },
        academicTerm: {
            type: Schema.Types.ObjectId,
            ref: "AcademicTerm",
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
        duration: {
            type: String,
            required: true,
            default: "3 years",
        }
    },
    { timestamps: true }
);

//model
const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;