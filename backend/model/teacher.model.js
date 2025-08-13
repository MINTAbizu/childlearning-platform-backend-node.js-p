const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        
    },
    lastName: {
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
    phoneNumber: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        default: "Ethiopia"
    },
    professionalTitle: {
        type: String,
        required: true
    },
    subjectsTaught: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: String,
        required: true
    },
    highestQualification: {
        type: String,
        required: true
    },
    ShortBio: {
        type: String,
        default: "No bio provided"
    }
},{timestamps: true});

const TeacherModel = mongoose.model("Teacher", TeacherSchema);
module.exports = TeacherModel;