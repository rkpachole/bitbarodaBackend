const { add_Exam,
    remove_Exam,
    edit_Exam,
    get_One_Exam,
    get_All_Exam,
    search_Exam,
    active_Exam,
    pagination_Exam } = require('../controllers/exam.controller')
const express = require('express')
const router = express.Router()

router.post('/add_Exam', add_Exam)
router.patch('/remove_Exam/:_id', remove_Exam)
router.patch('/edit_Exam/:_id', edit_Exam)
router.get('/search_Exam', search_Exam)
router.patch('/active_Exam/:_id', active_Exam)
router.get('/get_One_Exam/:_id', get_One_Exam)
router.get("/get_All_Exam", get_All_Exam)
router.get('/pagination_Exam', pagination_Exam)

module.exports = router  