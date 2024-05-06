const mongoose = require('mongoose');
const Schema = mongoose.Schema

const roleSchema = new Schema({
    email:{
        type:String
    },
    roleName: {
        type: String       
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

exports.roleModel = mongoose.model('role', roleSchema);
