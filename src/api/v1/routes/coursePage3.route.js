const { add_CoursePage3,
    remove_CoursePage3,
    edit_CoursePage3,
    get_One_CoursePage3,
    get_All_CoursePage3,
    search_CoursePage3,
    active_CoursePage3,
    pagination_CoursePage3 } = require('../controllers/coursePage3.controller')
const express = require('express')
const router = express.Router()

router.post('/add_CoursePage3', add_CoursePage3)
router.patch('/remove_CoursePage3/:_id', remove_CoursePage3)
router.patch('/edit_CoursePage3/:_id', edit_CoursePage3)
router.get('/search_CoursePage3', search_CoursePage3)
router.patch('/active_CoursePage3/:_id', active_CoursePage3)
router.get('/get_One_CoursePage3/:_id', get_One_CoursePage3)
router.get("/get_All_CoursePage3", get_All_CoursePage3)
router.get('/pagination_CoursePage3', pagination_CoursePage3)

module.exports = router  