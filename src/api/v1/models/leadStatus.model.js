const mongoose = require('mongoose');
const leadStatusSchema = mongoose.Schema({
    leadStatusName: {
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
exports.leadStatusModel = mongoose.model('leadStatus', leadStatusSchema);