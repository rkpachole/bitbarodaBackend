const mongoose = require('mongoose')
const Schema = mongoose.Schema


const courseSchema = new Schema({
    category: {
        type: [{
            name: {
                type: String,
                required: true,
            },
            id: {
                type: String,
                required: true,
            }
        }],

    },
    subCategory: {
        type: [{
            name: {
                type: String,
                required: true,
            },
            id: {
                type: String,
                required: true,
            }
        }],

    },
    courseName: {
        type: String,
        required: true
    },
    certificateName: {
        type: String,
        required: true
    },
    institute: {
        type: String,
        enum: ["bitinstitute", "otherUnivercity"],
        default: "bitinstitute"
    },
    courseType: {
        type: String,
        enum: ["individual", "bygroup", ""],
        default: ""
    },
    offlineFees: {
        type: Number,
        default: 0,
    },
    onlineFees: {
        type: Number,
        default: 0
    },
    corporateFees: {
        type: Number,
        default: 0
    },
    baseFees: {
        type: Number,
        default: 0
    },
    courseDuration: {
        type: Number,
        default: 0
    },
    frontendVisible: {
        type: Boolean,
        default: true
    },
    backendVisible: {
        type: Boolean,
        default: true
    },
    courseGrop: {
        type: String,
        enum: ["univercity", "coaching", ""],
        default: ""
    },
    univercity: {
        type: [{
            name: {
                type: String,
                default: "",
            },
            id: {
                type: String,
                default: "",
            }
        }],
    },
    Subcourse: {
        type: [{
            name: { type: String, default: "" },
            id: { type: String, default: "" },
            duration: { type: String, default: "" },
            laturesReport: { type: [{ id: { type: String, default:"" } }] },
            lab: {
                type: Boolean,
                default: false
            },
            theory: {
                type: Boolean,
                default: false
            },
            notavailable: {
                type: Boolean,
                default: false
            },
        }],
    },
    specialization: {
        type: [{
            course: { type: { name: { type: String, default: "" }, id: { type: String, default: "" } } },
            duration: { type: String, default: "" },
            laturesReport: { type: [{ id: { type: String, default: "" } }] },
        }],
    },
    Admission: {
        type: Number,
        default: 0
    },
    Admission_RM: {
        type: Number,
        default: 0
    },
    ReReg_2: {
        type: Number,
        default: 0
    },
    ReReg_3: {
        type: Number,
        default: 0
    },
    Exam_RM: {
        type: Number,
        default: 0
    },
    Exam_EFH: {
        type: Number,
        default: 0
    },
    Assignment_RM: {
        type: Number,
        default: 0
    },
    Degree_Process_Fees: {
        type: Number,
        default: 0
    },
    Late_Fees: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 18
    },
    isActive: {
        type: Boolean,
        default: true
    },
    metaTitle: {
        type: String,
        default: ""
    },
    metaKeyWords: {
        type: [String],
        default: []
    },
    metaDiscription: {
        type: String,
        default: ""
    },
    slugUrl: {
        type: String,
        default: ""
    }, 
    pageFormat: {
        type: String,
        enum: ["page1", "page2", "page3"],
        default: "page1"
    },
    laturesReport: {
        type: [{
            id: {
                type: String,
                required: true,
            }
        }]
    },
    lab: {
        type: Boolean,
        default: false
    },
    theory: {
        type: Boolean,
        default: false
    },
    notavailable: {
        type: Boolean,
        default: false
    },
    studyMaterial_URL: {
        type: [{
            image_URL: { type: String, default: "" },
            video_URL: { type: String, default: "" },
            mail_massage_URL: { type: String, default: "" }
        }]
    },
    Brochure: {
        type: String,
        default: ""
    },
    email: {
        type: String,
    },
    isDelete: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

exports.courseModel = mongoose.model('Courses', courseSchema)