const mongoose = require('mongoose');
const universitySchema = mongoose.Schema({
    universityName: {
        type: String,
        required: true
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
exports.universityModel = mongoose.model('universities', universitySchema);