const mongoose = require('mongoose')
const Schema = mongoose.Schema
const lactureReportSchema = new Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
    lacture: {
        type: [{
            s_No: { type: Number },
            mainPoint: { type: String },
            detail: { type: String },
        }]
    },  
    isActive: {
        type: Boolean,
        default: true,
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: true,
    },
}, { timestamps: true })

exports.lactureReportModel = mongoose.model('lactureReport', lactureReportSchema)