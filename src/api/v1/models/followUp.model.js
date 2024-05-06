const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateValidator = function (value) {
    // Regular expression to check the "dd/mm/yyyy" date format
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!dateRegex.test(value)) {
        return false; // Return false if the date does not match the format
    }
    return true; // Return true if the date is in the correct format and passes validation
};
const followUpSchema = new Schema({
    followUPStatus: {
        type: {
        followUpStatusName: {
            type: String,
            required: true,
        },
        followUpStatusId: {
            type: String,
            required: true,
        }
    },
        default: {}
    },
    followUpDate: {
        type: String,
        validate: {
            validator: dateValidator,
            message: 'Invalid date format. Must be in dd/mm/yyyy format.'
        },
    },
    email: {
        type: String,
        required: true,
    },
    takenBy: {
        userName: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    followUpBy: {
        userName: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    leadId: {
        type: String,
        required: true,
    },
    latestRemark: {
        type: String,
    },    
    nextFollowUPDate: {
        type: String,
        validate: {
            validator: dateValidator,
            message: 'Invalid date format. Must be in dd/mm/yyyy format.'
        },
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

exports.followUpModel = mongoose.model('followUps', followUpSchema)