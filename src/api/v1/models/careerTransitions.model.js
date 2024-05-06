const mongoose = require('mongoose');
const careerTransitionsSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    pastDesignatiion: {
        type: String,
        required: true,

    },
    companyLogo: {
        type: String,
        required: true,
    },
    Dessignation: {
        type: String,
        required: true,

    },
    course: {
        type: {
            courseName: {
                type: String,
                required: true,
            },
            courseId: {
                type: String,
                required: true,
            }
        }
    },    
    email: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})
exports.careerTransitionsModel = mongoose.model('career_transitions', careerTransitionsSchema);
