const mongoose = require('mongoose')
const Schema = mongoose.Schema
const coursePage2Schema = new Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
    Section1: {
        title1: {
            type: String,
            default: "Association of Chartered Certified Accountants, UK"
        },
        title2: {
            type: String,
            default: "Unlocking Global Opportunities In Accounting And Finance"
        },
        content1: {
            type: String,
            default: "Global CA certification with recognition in 180 Countries"
        },
        content2: {
            type: String,
            default: "Global CA certification with recognition in 180 Countries"
        },
        brochure: {
            type: String,
            default: ""
        },
        numbers: {
            type: [{
                image: { type: String, default: "" }, label1: { type: String, default: "" }, label2: { type: String, default: "" }
            }]
        }
    },
        //"numbers":[{"image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Group 256.png","label1":"80,000","label2":"Members, Affiliates & Future Members"},{"image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Group 258.png","label1":"180","label2":"Countries Across the World"},{"image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Group 261.png","label1":"7600","label2":"Top ACCA Approved Employers"}],

    section2: {
        title: {
            type: String,
            default: "The World of ACCA"
        },
        description: {
            type: String,
            default: "The Association of Chartered Certified Accountants (ACCA) qualification is a globally recognized certification in accounting, audit, and finance awarded by the ACCA body in the United Kingdom. It is the world's oldest CA program and has a structure consisting of three levels, namely Knowledge, Skill, and Professional.ACCA is accepted in 180 countries and is known as the global CA because it provides better career opportunities worldwide.The program prepares professionals for various domains such as accounting, auditing, taxation, management, finance, investment banking, corporate finance, forensic audit and consulting."
        },
        image: {
            type: String,
            default: ""
        },
        video: {
            type: String,
            default: ""
        }
    },
    section3: {
        heading: {
            type: String,
            default: "Advance Your Accounting Career With ACCA, UK"
        },
        content: {
            type: [{
                image: { type: String, default: "" }, title: { type: String, default: "" }, description: { type: String, default: "" }
            }]
        }
    },
           // content: [
            // { 
         //    "image": "http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/guranteed 1.png",
        //     "title": "Guaranteed Placement Or Money Back" ,
        //     "description":"While you commit to study for ACCA at Imarticus, you get a 100% placement    guarantee upon completing even the first 2 levels of ACCA. There is a placement or internship guarantee or the candidate can get his money back. It's not just a course but a guaranteed career you sign up for when you join Imarticus."
        //     },{
        //     "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/jobrelevent 1.png"
        //     "title": "Passing Guarantee"
        //     "description":"If the ACCA curriculum looks comprehensive, we promise to make it easy and secure for the learner. Imarticus offers an unconditional and unlimited guarantee to coach you to pass the ACCA exams. You can redo the entire program and retake all sessions until you successfully pass at no extra cost."
        //     },{
        //     "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/learnbydoing 1.png",
        //     "title":"Placement Bootcamp",
        //     "description": "The ACCA program at Imarticus includes a comprehensive pre-placement boot camp at the professional level of ACCA. The boot camp comprises resume-building services, interview prep sessions, soft skills, personality development workshops and guaranteed internships with top companies for ACCA professional level."
        //     },{
        //     "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/careerAssistence 1.png",
        //     "title": "Most Comprehensive Study Materials",
        //     "description": "ACCA course materials at Imarticus include ACCA books, a question bank, practice papers, MCQs, flashcards, learning videos, etc., live classes by ACCA faculties and on-demand classes by International ACCA trainers. The study content is powered by Kaplan, the biggest ACCA-approved content partner."
        //     }, {
        //     "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/capstone 1.png",
        //     "title":"ACCA Qualified Faculty",
        //     "description":"Experienced Imarticus faculty with ACCA, CA, FCA, CFA, CMA and CPA qualifications provide personalised mentoring sessions to all learners. Exam-specific doubt-clearing sessions are also available to ensure that concepts are crystal clear and students pass the ACCA exams on the first attempt."
        //     },{
        //     "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/experitial 1.png",
        //     "title":"Add On Course To ACCA",
        //     "description":"ACCA course at Imarticus begins with a back-to-basics approach. We start with the fundamentals of accounting and business studies, and once the basics are done, we move on to the core ACCA curriculum. Besides this, students learn more about practical tools such as MS excel, advanced excel, financial modelling, etc."
        //     }
        // ]
    section4: {
        heading: {
            type: String,
            default: "What Are The Additional Benefits Of Joining ACCA With Imarticus?"
        },
        content: {
            type: [{
                image: { type: String, default: "" }, title: {type: String,default: "ACCA Approved Learning Partner" }
            }]
        }
    },
    //     content: [
    //        {
    //         "image": "http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Group(1) 1.png",
    //         "title":"ACCA Approved Learning Partner"
    //         },{
    //         "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Group(2) 1.png",
    //         "title":"Content From ACCA Approved"
    //         },{
    //         "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Group(3) 1.png",
    //         "title":"In-class Simulations"
    //         },{
    //         "image": "http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Group(4) 1.png"
    //         "title":"Internship or Placement Guarantee"
    //         },{
    //         "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Maskgroup(9) 1.png",
    //         "title":"100% Money Back Guarantee"
    //         },{
    //         "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Maskgroup(11) 1.png",
    //         "title":"Dual Certification – ACCA  QPA"
    //          },{
    //         "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Maskgroup(12) 1.png",
    //         "title":"Discount on ACCA Board Fees"
    //          },{
    //         "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Clip path group.png",
    //         "title":"Personaized Study Plans"
    //          },{
    //         "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Maskgroup(13) 1.png",
    //         "title":"Additional Free ACCA Pre Course"
    //         },{
    //         "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Group4504 1.png",
    //         "title":"Practicals with Live Simulation"
    //         }
//           ]
    
    section5: {
        image: {
            type: String,
            default: "http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/kaleidico-7lryofJ0H9s-unsplash 1.png"
        },
        title: {
            type: String,
            default: "Why Join ACCA, UK?"
        },
        description: {
            type: String,
            default: "•To Become A GlobalCA                                                                    •Work With The Top Companies Worldwide                                                          •High Paying Careers In 180 Countries                                                         •Inbuilt Internship And Placements                                                              •More Flexible Than CA India program                                                           •Higher Rewarding Than CA India                                                              •Building Diversified Skill Set                                                           •Credibility Of ACCA Membership"

        }
    },
    section6: {
        image: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: "What Are The Exam Details?"
        }
    },
    section7: {
        image: {
            type: String,
            default: "http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/thought-catalog-505eectW54k-unsplash 1.png"
        },
        title: {
            type: String,
            default: "The Exemptions"
        },
        description: {
            type: String,
            default: "Those with qualifications higher than 102, are eligible to get exemptions on some specific papers.                                                                                  B.Com, BBA, M.Com, MBA – Get exemption upto 4 specific papers                                   Work With The Top Companies Worldwide                                                           High Paying Careers In 180 Countries                                                      Candidates can check for applicable exemptions at the ACCA Exemption Calculator.                 Let us know if you have any questions about exemptions and our experts will be able to assist you with the details."
        }
    },
    section8: {
        heading1: {
            type: String,
            default: "Exceptional Features"
        },
        content: {
            type: [{
                image: { type: String, default: "" }, title: { type: String, default: "" }, description: {
                    type: String, default: ""
                }
            }]
        }
    },
    //content:[{ 
    //    "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Pass-for-Sure-Assurance black 1.png",
    //    "title": "Pass for sure",
    //    "description":"Exam preparation at Imarticus keep students worry free as is A they student can repeat classes, sessions and mocks as often as they he wants until they he pass.And all thus comes es at zero extra cost."
    //     },{
    //     "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/100 1.png",
    //     "title2":"Guaranteed Placement or Money-back",
    //     "description2":"Gives a placement guarantee to all who want an internship/ placement at the end of the course and the guarantee has a 100% money back of professional level if the student doesn't get placement."
    //     }]
    section9: {
        title: {
            type: String,
            default: "Will I Get Certified?"
        },
        description: {
            type: String,
            default: "Upon completing this Program, you shall receive a Certificate for Postgraduate Financial Analysis Program.This particular certification will add a significant amount of value to your professional credentials."
        },
        image: {
            type: String,
            default: "http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Screenshot_121 1.png"
        },
        contents: {
            type: [{
                title: { type: String, default: "" }, image: { type: String, default: "" }
            }]
        }, 
        // content:[
            //  {
        //     "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/3209368_assurance_award_certificate_document_guarantee_icon 1(1)",
        //     "title":"Earn Your Certificate"
        //     },{
        //      "image":"http://192.168.29.194/BitBaroda/Backend/src/api/v1/image/Vector.png",
        //      "title":"Share your Achievement"
        //     },
        //   ]
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
exports.coursePage2Model = mongoose.model('CoursePage2', coursePage2Schema)