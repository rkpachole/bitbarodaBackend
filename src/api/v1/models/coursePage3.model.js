const mongoose = require('mongoose')
const Schema = mongoose.Schema
const coursePage3Schema = new Schema({
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
            default: "Your Path to a Successful Tech Career!"
        },
        subHeading1: {
            type: String,
            default: "Now experience the program for Free"
        },
        subHeading2: {
            type: String,
            default: "NEXT BATCH STARTS MID - JUNE"
        },
        content: {
            type: [String],
        },
        // content: [
        //     "126%  Avg. CTC Hike","Top 1% Industry Instructors","900+ Placement Partners"
        //    ]
    },
    section2: {
        heading: {
            type: String,
            default: "A program for engineers to master Problem Solving & System Design"
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
                }
            }],
        },
        // content: [{
        //     "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/9044222_data_structured_icon 1.png",
        //     "title":"Structured, industry vetted curriculum"
        //     }
        // },{
        //     "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/6570710_class_education_from_home_learning_icon (1) 1.png",
        //     "title":"Live classes by faculty"
        // },{
        //     "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/4047421_account_experience_person_persona_profile_icon 1.png",
        //     "title":"Practical experience through real- life projects"
        // },{
        //     "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/3957344_business_coach_course_instructor_mentor_icon 1.png",
        //     "title": "Regular 1:1 mentorship"
        // }, {
        //     "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/3709737_call_centre_online_service_support_icon 1.png",
        //     "title":"Career support"
        // },{
        //     "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/216232_group_icon (1) 1.png",
        //     "title":"Aspirational peer group"
        // }
        // ],
    },
    section3: {
        heading: {
            type: String,
            default: "We have designed a flexible program for you"
        },
        content1: {
            image: {
                type: String,
                default: "http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/6570719_class_education_learning_lecture_room_icon (1) 1.png"
            },
            title: {
                type: String,
                default: "Missed a class?"
            },
            description: {
                type: String,
                default: "Watch the recording later, with teaching assistants available to solve your doubts"
            },
        },
        content2: {
            image: {
                type: String,
                default: "http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/9044923_pedestrian_family_icon 1.png"
            },
            title: {
                type: String,
                default: "Work / family needs time?"
            },
            description: {
                type: String,
                default: "Pause your course and restart a month later with the next batch!"
            },
        },
        content3: {
            image: {
                type: String,
                default: "http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/290144_building_office_finance buildings_icon (1) 1.png"
            },
            title: {
                type: String,
                default: "Jobs & class timings clash?"
            },
            description: {
                type: String,
                default: "Decide your ideal class timing together with your classmates"
            },
        },
        content4: {
            image: {
                type: String,
                default: "http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/3209435_pending_revise_time_unfinish_wait_icon (2) 1.png"
            },
            title: {
                type: String,
                default: "Want to revise?"
            },
            description: {
                type: String,
                default: "Access assignments/notes life long and recordings upto 6 months post course completion"
            },
        },
        content5: {
            image: {
                type: String,
                default: "http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/4230548_confusion_doubt_frustration_question_icon (1) 1.png"
            },
            title: {
                type: String,
                default: "Have doubts?"
            },
            description: {
                type: String,
                default: "Get them resolved over text / video by our expert teaching assistants!"
            },
        }
    },
    section4: {
        heading: {
            type: String,
            default: "Discover & connect with Alumni"
        },
        label: {
            type: [String]
        }
        // label: [
        // "Tech Giants", "Q&A With Alumni", "Service To Product", "Service To Teach Giants", "Service To Unicorn Startups", "0 To 3 Years Experience", "Data Science & ML"
        // ]
    },
    section5: {
        heading: {
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

        },
        uploadReport: {
            type: String,
            default: ""
        },
    },
    section6: {
        heading: {
            type: String,
            default: "Meet Our Experts"
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
                },
            }]
        },
        // content: [{
        //     "image":"",
        //     "title":"Andrew Falloff",
        //     "description":"It was popularised in the 1960s with the release of Letraset sheets containing Lorem psum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        //     },{
        //     "image":"",
        //     "title":"Andrew Falloff"
        //     "description":"It was popularised in the 1960s with the release of Letraset sheets containing Lorem psum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        //     },{
        //     "image": "",
        //     "title":"Andrew Falloff",
        //     "description":"It was popularised in the 1960s with the release of Letraset sheets containing Lorem psum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        // }
        // ]
    },
    section7: {
        heading: {
            type: String,
            default: "Become a Scaler Mentor"
        },
        subHeading: {
            type: String,
            default: "A chance to give back to the community. Mentor Scaler students and help them unlock their true potential."
        },
        image: {
            type: String,
            default: "http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/discuss 1.png"
        },
    },
    section8: {
        heading1: {
            type: String,
            default: "Career services"
        },
        subHeading1: {
            type: String,
            default: "Along with preparing you for the job, we also help you prepare for your search & your interviews"
        },
        heading2: {
            type: String,
            default: "500+ Multinational Hiring Partners"
        },
        subHeading2: {
            type: String,
            default: "A World Of Opportunities For You"
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
                },
            }]
        },
        //  content:  [
        //        {
        //         image: "http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/314835_document_certificate_icon 1.png"
        //         "title": "Dedicated recruiter team & 100+ employer partners help bring you diverse options"
        //        },{
        //         "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Group 185.png"
        //         "title":"Exchange job opportunities with our extensive Scaler student community"
        //         },{
        //         "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/7218362_document_business_paper_file_paperwork_icon 1.png"
        //         "title": "Practice mock interviews with people working in the industry"
        //         }, {
        //         "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Group 183.png"
        //         "title": "Optimize your resume & LinkedIn profile with our experienced experts"
        //         }
        //     ]

    },
    section9: {
        heading: {
            type: String,
            default: "Confused about which company to target next? Try Our FREE Career Roadmap."
        }
    },
    section10: {
        heading: {
            type: String,
            default: "Excel With Imarticus"
        },
        image: {
            type: String,
            default: ""
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
exports.coursePage3Model = mongoose.model('coursePage3', coursePage3Schema)