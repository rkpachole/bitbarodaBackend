const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hiaringPartnerSchema = new Schema ({
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
exports.hairingPartnerModel = mongoose.model('hiaringPartner', hiaringPartnerSchema)
