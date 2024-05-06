const mongoose = require('mongoose');
const categoySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true    
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
})
exports.categoryModel = mongoose.model('categories', categoySchema);