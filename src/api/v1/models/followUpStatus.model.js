const mongoose = require('mongoose');
const followUpStatusSchema = mongoose.Schema({
    followUpStatusName: {
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
exports.followUpStatusModel = mongoose.model('followUpStatus', followUpStatusSchema);