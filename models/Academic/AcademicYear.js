const mongoose = require('mongoose')

const { Schema } = mongoose;

const AcademicYearSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        fromYear: {
            type: Date,
            required: true,
        },
        toYear: {
            type: Date,
            required: true,
        },
        isCurrent: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "Student",
                default: [],
            },
        ],
        teachers: [
            {
                type: Schema.Types.ObjectId,
                ref: "Teacher",
                default: [],
            },
        ],
    },
    { timestamps: true } //this will add createdAt and updatedAt fields
);

//model
const AcademicYear = mongoose.model("AcademicYear", AcademicYearSchema);

module.exports = AcademicYear;