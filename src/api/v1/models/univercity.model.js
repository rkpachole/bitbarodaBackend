const mongoose = require('mongoose');
const univercitySchema = mongoose.Schema({
    univercityName: {
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
},{
    timestamps: true,
})
exports.univercityModel = mongoose.model('univercities', univercitySchema);