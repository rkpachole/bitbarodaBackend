const mongoose = require('mongoose')
const Schema = mongoose.Schema
const coursePage3Schema = new Schema({
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
        content1: {
            type: String,
            default: "126%  Avg. CTC Hike"
        },
        content2: {
            type: String,
            default: "Top 1% Industry Instructors"
        },
        content3: {
            type: String,
            default: "900+ Placement Partners"
        },
    },
    section2: {
        heading: {
            type: String,
            default: "A program for engineers to master Problem Solving & System Design"
        },
        content1: {
            image: {
                type: String,
                default: "9044222_data_structured_icon 1.png"
            },
            title: {
                type: String,
                default: "Structured, industry vetted curriculum"
            }
        },
        content2: {
            image: {
                type: String,
                default: "6570710_class_education_from_home_learning_icon (1) 1.png"
            },
            title: {
                type: String,
                default: "Live classes by faculty"
            },
            l
        },
        content3: {
            image: {
                type: String,
                default: "4047421_account_experience_person_persona_profile_icon 1.png"
            },
            title: {
                type: String,
                default: "Practical experience through real- life projects"
            }
        },
        content4: {
            image: {
                type: String,
                default: "3957344_business_coach_course_instructor_mentor_icon 1.png"
            },
            title: {
                type: String,
                default: "Regular 1:1 mentorship"
            }
        },
        content5: {
            image: {
                type: String,
                default: "3709737_call_centre_online_service_support_icon 1.png"
            },
            title: {
                type: String,
                default: "Career support"
            }
        },
        content6: {
            image: {
                type: String,
                default: "216232_group_icon (1) 1.png"
            },
            title: {
                type: String,
                default: "Aspirational peer group"
            }
        }
    },
    section3: {
        heading: {
            type: String,
            default: "We have designed a flexible program for you"
        },
        content1: {
            image: {
                type: String,
                default: "6570719_class_education_learning_lecture_room_icon (1) 1.png"
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
                default: "9044923_pedestrian_family_icon 1.png"
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
                default: "290144_building_office_finance buildings_icon (1) 1.png"
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
                default: "3209435_pending_revise_time_unfinish_wait_icon (2) 1.png"
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
                default: "4230548_confusion_doubt_frustration_question_icon (1) 1.png"
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
        label1: {
            type: String,
            default: "Tech Giants"
        },
        label2: {
            type: String,
            default: "Q&A With Alumni"
        },
        label3: {
            type: String,
            default: "Service To Product"
        },
        label4: {
            type: String,
            default: "Service To Teach Giants"
        },
        label5: {
            type: String,
            default: "Service To Unicorn Startups"
        },
        label6: {
            type: String,
            default: "0 To 3 Years Experience"
        },
        label7: {
            type: String,
            default: "Data Science & ML"
        }
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
        content1: {
            image: {
                type: String,
                default: ""
            },
            title: {
                type: String,
                default: "Andrew Falloff"
            },
            description: {
                type: String,
                default: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem psum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            },
        },
        content2: {
            image: {
                type: String,
                default: ""
            },
            title: {
                type: String,
                default: "Andrew Falloff"
            },
            description: {
                type: String,
                default: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem psum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            },
        },
        content3: {
            image: {
                type: String,
                default: ""
            },
            title: {
                type: String,
                default: "Andrew Falloff"
            },
            description: {
                type: String,
                default: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem psum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            },
        },

    },
    // heading: {
    //     type: String,
    //     default: "Let Us Walk Through Your Learning Path"
    // },
    // image: {
    //     type: String,
    //     default: ""
    // },src/api/v1/image/discuss 1.png
    section7: {
        heading: {
            type: String,
            default: "How Will I Learn The Practical Implications Of The Course?"
        },
        image: {
            type: String,
            default: "discuss 1.png"
        },
src/api/v1/image/discuss 1.png
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
        content1: {
            title: {
                type: String,
                default: "Earn Your Certificate"
            },
            image: {
                type: String,
                default: "3209368_assurance_award_certificate_document_guarantee_icon 1.png"

            }
        },
        content2: {
            title: {
                type: String,
                default: "Share your Achievement"
            },
            image: {
                type: String,
                default: "309040_crown_moderator_achievement_award_best_icon 1.png"

            }
        },
        image: {
            type: String,
            default: "Screenshot_121 1.png"
        }
    },
    section9: {
        heading: {
            type: String,
            default: "Grow Learning"
        },
        description: {
            type: String,
            default: "We’re focused on giving you an integrated learning experience.With our one- of - its -kind career support services, we continue to support you as you take a step into your career with a renewed perspective.Get access to over 500+ placement partners and explore unlimited pportunities."
        },
        content: {
            type: String,
            default: "An In-Depth Look At The Financial Analysis Job Landscape"
        },
        uploadReport: {
            type: String,
            default: ""
        },
        contentCard1: {
            title: {
                type: String,
                default: "Job Guarantee"
            },
            description: {
                type: String,
                default: "You will receive the skills to succeed and land the job of your dreams with our job guarantee program."

            }
        },
        contentCard2: {
            title: {
                type: String,
                default: "Profile Enhancement"
            },
            description: {
                type: String,
                default: "We assist you in building a robust portfolio to ensure that your profile always atches the eye of prospective employers."

            }
        },
        contentCard3: {
            title: {
                type: String,
                default: "Resume Building"
            },
            description: {
                type: String,
                default: "Redesign your resume with professional help and highlight your strengths in the best possible way."

            }
        },
        contentCard4: {
            title: {
                type: String,
                default: "Interview Prep"
            },
            description: {
                type: String,
                default: "We've analysed the most common only asked interview questions and built a training module that confidently prepares you for job interviews."
            }
        },
        contentCard5: {
            title: {
                type: String,
                default: "Career Mentoring"
            },
            description: {
                type: String,
                default: "Our dedicated program mentors are seasoned professionals that will assist you with he curriculum, ensure you are up- to - date."
            }
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