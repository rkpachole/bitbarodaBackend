const mongoose = require('mongoose');
const examSchema = mongoose.Schema({
    examName: {
        type: String,
        required: true,    
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
exports.examModel = mongoose.model('exam', examSchema);