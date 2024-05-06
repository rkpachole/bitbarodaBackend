const { add_LectureReport,
    remove_LectureReport,
    edit_LectureReport,
    get_One_LectureReport,
    get_All_LectureReport,
    search_LectureReport,
    active_LectureReport,
    pagination_LectureReport,
    get_All_LectureReport_ByCourseId } = require('../controllers/lectureReport.controller')
const express = require('express')
const router = express.Router()

router.post('/add_LectureReport', add_LectureReport)
router.patch('/remove_LectureReport/:_id', remove_LectureReport)
router.patch('/edit_LectureReport/:_id', edit_LectureReport)
router.get('/search_LectureReport', search_LectureReport)
router.patch('/active_LectureReport/:_id', active_LectureReport)
router.get('/get_One_LectureReport/:_id', get_One_LectureReport)
router.get("/get_All_LectureReport", get_All_LectureReport)
router.get("/get_All_LectureReport_ByCourseId", get_All_LectureReport_ByCourseId)
router.get('/pagination_LectureReport', pagination_LectureReport)

module.exports = router  