const mongoose = require('mongoose')
const Schema = mongoose.Schema
const studyMaterialSchema = new Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
    studyMaterial_URL: {
        type: [{
            image_URL: { type: String, default: "" },
            video_URL: { type: String, default: "" },
            mail_massage_URL: { type: String, default: "" }
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
    titel: {
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
}, { timestamps: true })

exports.studyMaterialModel = mongoose.model('studyMaterial', studyMaterialSchema)