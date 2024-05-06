
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const specializationSchema = new Schema({
    duration: {
        type: String,
        required: true,
    },
    course: {
        type: {
            courseName: { type: String, default:'' },
            courseId: { type: String, default:'' }
        }
    },
    specializationType: {
        type:Number,
        enum:[1,2,3,4],
        required:true
    },
    laturesReport: {
        type: [{
            id: {
                type: String,
                required: true,
            }
        }]
    },
    courseGroupName: {
        type: String,
        required: true,
    },
    courseGroupId: {
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
exports.specializationModel = mongoose.model('specialization', specializationSchema)