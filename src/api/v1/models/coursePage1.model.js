const mongoose = require('mongoose')
const Schema = mongoose.Schema
// var path = "http://192.168.29.194/BitBaroda/Backend/src/api/v1/image"
var path = "http://13.235.150.18:3000/image/"

const coursePage1Schema = new Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
    section1: {
        heading: {
            type: String,
            default: "Postgraduate Financial Analysis Program"
        },
        subHeading1: {
            type: String,
            default: "Switch to a High-Growth Career in Finance"
        },
        subHeading2: {
            type: String,
            default: "Own your future learning new skills online"
        },
        courseSummary: {
            type: [{
                image: { type: String, default: "" }, label: { type: String, default: "" }
            }]
        },
        brochure: {
            type: String,
            default: ""
        },
        bannerImage: {
            type: String,
            default: ""
        },
    },
    section2: {
        numbers: {
            type: [{
                image: { type: String, default: "" }, label1: { type: String, default: "" }, label2: { type: String, default: "" }
            }]
        },
    },
    section3: {
        heading1: {
            type: String,
            default: "500 Multinational Hiring Partners"
        },
        heading2: {
            type: String,
            default: "A World Of Opportunities For You"
        }
    },
    section4: {
        heading: {
            type: String,
            default: "About Postgraduate Financial Analysis Program"
        },
        subHeading: {
            type: String,
            default: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus coursePageMaker including versions of Lorem Ipsum."
        },
        content: {
            type: [{
                image: {
                    type: String,
                    default: ""
                },
                title: {
                    type: String,
                    default: ""
                },
                description: {
                    type: String,
                    default: ""
                }
            }]
        }
    },
    section5: {
        brochureDownLoad: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: "We Have An 80% Placement Success Rate"
        },
        description: {
            type: String,
            default: "Learn more about how we’ve been impacting thousands of careers."

        }
    },
    section6: {
        heading: {
            type: String,
            default: "Trusted By Millions Of Learners Around The World"
        },
    },
    // heading: {
    //     type: String,
    //     default: "Let Us Walk Through Your Learning Path"
    // },
    // image: {
    //     type: String,
    //     default: ""
    // },
    section7: {
        heading: {
            type: String,
            default: "How Will I Learn The Practical Implications Of The Course?"
        },
        subHeading: {
            type: String,
            default: ""
        },
    },
    section8: {
        heading: {
            type: String,
            default: "Will I Get Certified?"
        },
        description: {
            type: String,
            default: "Upon completing this Program, you shall receive a Certificate for Postgraduate Financial analysis Program.This particular certification will add a significant amount of value to your professional credentials."
        },
        contents: {
            type: [{
                title: { type: String, default: "" }, image: { type: String, default: "" }
            }]
        }, 
        image: {
            type: String,
            default: `${path}/Screenshot_1211.png`
        }
    },
    section9: {
        heading: {
            type: String,
            default: "Grow Learning"
        },
        description: {
            type: String,
            default: "We’re focused on giving you an integrated learning experience.With our one- of - its -kind career support services, we continue to support you as you take a step into your career with a renewed perspective.Get access to over 500 placement partners and explore unlimited pportunities."
        },
        content: {
            type: String,
            default: "An In-Depth Look At The Financial Analysis Job Landscape"
        },
        uploadReport: {
            type: String,
            default: ""
        },
        image: {
            type: String, default: `${path}/mentotring.png`
        }
    },
    section10: {
        heading: {
            type: String,
            default: "What Is The Program Eligibility And Admission Process"
        },
        description: {
            type: String,
            default: "Candidates should possess a minimum of 50% score in their UG graduation."

        },
        image: {
            type: String,
            default: `${path}/Group 5475.png`
        }
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
exports.coursePage1Model = mongoose.model('coursePage1', coursePage1Schema)