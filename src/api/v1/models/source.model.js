const mongoose = require('mongoose');
const sourceSchema = mongoose.Schema({
   sourceName: {
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
exports.sourceModel = mongoose.model('source',sourceSchema);