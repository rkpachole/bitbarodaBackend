const mongoose = require('mongoose');
const subCategorySchema = mongoose.Schema({
    category: {
        type: String, 
        required:true
    },
    subCategoryName: {
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
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})
exports.subCategoryModel = mongoose.model('subCategories', subCategorySchema);