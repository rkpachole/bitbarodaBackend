const mongoose = require('mongoose');
const branchSchema = mongoose.Schema({
    branchName: {
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
exports.branchModel = mongoose.model('branch', branchSchema);