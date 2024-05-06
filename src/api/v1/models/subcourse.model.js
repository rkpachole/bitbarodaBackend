const mongoose = require('mongoose');
const Schema = mongoose.Schema
const subcourseSchema = new Schema({
    duration: {
        type: String,
        required: true,
    },
    course: {
        type: [{
            courseName: { type: String, default:'' },
            courseId: { type: String, default:'' }
        }]
    },
    laturesReport: {
        type: [{
            id: {
                type: String,
                required: true,
            }
        }]
    },
    lab: {
        type: Boolean,
        default: false
    },
    theory: {
        type: Boolean,
        default: false
    },
    notavailable: {
        type: Boolean,
        default: false
    },
    courseGroupName: {
        type: String,
        required: true,
    },
    courseGroupId:{
        type: String,
        required: true,
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
}, { timestamps: true }
)
exports.subCourseModel = mongoose.model('subcourse', subcourseSchema)