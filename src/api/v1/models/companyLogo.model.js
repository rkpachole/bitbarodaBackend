const mongoose = require('mongoose')
const Schema = mongoose.Schema
const companySchema = new Schema({
    course: {
        type: [{
            courseName: {
                type: String,
                default: ""
            },
            courseId: {
                type: String,
                default: ""
            }
        }]
    },
    name: {
        type: String,
        default: ""
    },
    logo: {
        type: String,
        default: "",
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
})

exports.companyModel = mongoose.model('company', companySchema)
