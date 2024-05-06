const express = require("express");
const router = express.Router();

require("../v1/config/mongodb");

const categoryRoute = require('./routes/categories.route')
const subcategoryRoute = require('./routes/subcategory.route')
const universityRoute = require('./routes/university.route')
const courseRoute = require('./routes/course.route')
const careerTransitionsRoute = require('./routes/careerTransitions.route')
const leadRoute = require('./routes/lead.route')
const hairingPartnerRoute = require('./routes/hairingPartner.route')
const examRoute = require('./routes/exam.route')
const companyRoute = require('./routes/company.route')
const learningPartnerRoute = require('./routes/learningPartner.route')
const coursePageRoute = require('./routes/coursePage1.route')
const sourceRoute = require("./routes/source.route")
const branchRoute = require('./routes/branch.route')
const leadStatusRoute = require('./routes/leadStatus.route')
const roleRoute = require('./routes/role.route')
const userRoute = require('./routes/user.route')
const followUpStatusRoute = require('./routes/followUpStatus.route')
const followUpRoute = require('./routes/followUp.route')
const studyMaterialRoute = require('./routes/studyMaterial.route');
const lectureReportRoute = require('./routes/lectureReport.route')
const subcourseRoute = require('./routes/Subcourse.route')
const specializationRoute = require('./routes/specialization.route')
const coursePage2Route = require('./routes/coursePage2.route')
const coursePage3Route = require('./routes/coursePage3.route')

router.use("/coursePage", coursePageRoute)
router.use("/categories", categoryRoute)
router.use("/subcategory", subcategoryRoute)
router.use('/university', universityRoute)
router.use('/course', courseRoute)
router.use('/lead', leadRoute)
router.use('/careerTransitions', careerTransitionsRoute)
router.use('/hairingPartner', hairingPartnerRoute)
router.use("/exam", examRoute)
router.use('/company', companyRoute)
router.use('/learningPartner', learningPartnerRoute)
router.use('/source', sourceRoute)
router.use('/branch', branchRoute)
router.use('/leadStatus', leadStatusRoute)
router.use('/role', roleRoute)
router.use("/user", userRoute)
router.use("/followUpStatus", followUpStatusRoute)
router.use("/followUp", followUpRoute)
router.use('/studyMaterial', studyMaterialRoute)
router.use('/lectureReport', lectureReportRoute)
router.use('/subcourse', subcourseRoute)
router.use('/specialization', specializationRoute)
router.use('/coursePage2', coursePage2Route)
router.use('/coursePage3', coursePage3Route)



module.exports = router;
