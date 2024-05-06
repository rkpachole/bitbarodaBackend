const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },        
    name:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role:{
        roleName: { type: String },
        id: { type: String }
    },
    branch: {
        branchName: { type: String },
        id: { type: String }
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    isLogin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true})
exports.userModel = mongoose.model('users', userSchema)