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


const leadSchema = new Schema({
    source: {
        sourceName: {
            type: String,
            required: true,
        },
        sourceId: {
            type: String,
            required: true,
        }
    },
    leadDate: {
        type: String,
        validate: {
            validator: dateValidator,
            message: 'Invalid date format. Must be in dd/mm/yyyy format.'
        },
        required: true,
    },
    assignedTo: {
        userName: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }
    },
    fromBranch: {
        branchName: { type: String, required: true },
        id: { type: String, required: true }
    },
    toBranch: {
        branchName: { type: String, required: true },
        id: { type: String, required: true },
    },
    firstName: {
        type: String,
        required: true,
    },
    fathersName: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        unique: [true, 'Full name already exists.Please use a different.']
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: [true, 'Phone number already exists.Please use a different.'],
    },
    whatsapp: {
        type: String,
        required: true,
        unique: [true, 'whatsapp number already exists.Please use a different.'],
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    courseMode: {
        type: String,
        enum: ["online", "offline", "both"],
        required: true,
        message: 'Invalid course mode. Must be one of: online, offline, both.'
    },
    state: {
        type: String,
        required: true,
    },
    course: {
        type: [{
            courseName: {
                type: String,
                required: true,
            },
            courseId: {
                type: String,
                required: true,
            }
        }]
    },
    zipCode: {
        type: String,
        required: true,
    },
    leadValue: {
        type: Number,
        required: true,
    },
    Discription: {
        type: String,
        required: true,
    },
    isSecuired: {
        type: Boolean,
        default: false,
    },
    islocked: {
        type: Boolean,
        default: false,
    },
    latestRemark: {
        type: String,
        default: ""
    },
    lastFollowUpDate: {
        type: String,
        validate: {
            validator: dateValidator,
            message: 'Invalid date format. Must be in dd/mm/yyyy format.'
        },
        default: "00/00/0000"
    },
    nextFollowUPDate: {
        type: String,
        validate: {
            validator: dateValidator,
            message: 'Invalid date format. Must be in dd/mm/yyyy format.'
        },
        default: "00/00/0000"
    },
    leadStatus: {
        type: String,
        enum: ["pending", "complete"],
        default: "pending",
        message: 'Invalid leaStatus. Must be one of: pending, complete.'

    },
    followUPStatus: {
        type: {
            followUpStatusName: {
                type: String,
                default: ""

            },
            followUpStatusId: {
                type: String,
                default: ""
            }
        },
        default: {}
    },
    WalkedInStatus: {
        type: Boolean,
        default: false
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

exports.leadModel = mongoose.model('leads', leadSchema)