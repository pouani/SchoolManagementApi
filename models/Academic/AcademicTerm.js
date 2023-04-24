const mongoose = require('mongoose')

const { Schema } = mongoose;

const AcademicTermSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
            default: "3 months",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, //this is the id of the admin that created the academic term
            ref: "Admin",
            required: true,
        },
    },
    { timestamps: true } //this will add createdAt and updatedAt fields
);

//model
const AcademicTerm = mongoose.model("AcademicTerm", AcademicTermSchema);

module.exports = AcademicTerm;