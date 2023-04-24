const mongoose = require('mongoose');

const { Schema } = mongoose;

const TeacherSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        dateEmployed: {
            type: Date,
            default: Date.now,
        },
        teacherId: {
            type: String,
            required: true,
            default: function(){
                return (
                    "TEA" +
                    Math.floor(100 + Math.random() * 900) +
                    this.name
                        .split(" ")
                        .map(name => name[0])
                        .join("")
                        .toUpperCase()
                );
            },
        },
        //if witdrawn, teacher will not be able to login
        isWitdwrawn: {
            type: Boolean,
            default: false,
        },
        //if suspended, teacher will not be able to login
        isSuspended: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            default: "teacher",
        },
        subject: {
            type: String,
        },
        applicationStatus: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },

        program: {
            type: String,
        },

        //A teacher can teach in more than one class level
        classLevel: {
            type: String,
        },
        academicYear: {
            type: String,
        },
        examsCreated: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Examen',
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            // required: true,
        },
        academicTerm: {
            type: String,
        },
    },
    { timestamps: true }
);

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;