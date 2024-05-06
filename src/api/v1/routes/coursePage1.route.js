const { add_CoursePage1,
    remove_CoursePage1,
    edit_CoursePage1,
    get_One_CoursePage1,
    get_All_CoursePage1,
    active_CoursePage1, search_CoursePage1, pagination_CoursePage1 } = require('../controllers/coursePage1.controller')
const express = require('express')
const router = express.Router()

router.post('/add_CoursePage1', add_CoursePage1)
router.get('/search_CoursePage1', search_CoursePage1)
router.patch('/remove_CoursePage1/:_id', remove_CoursePage1)
router.patch('/edit_CoursePage1/:_id', edit_CoursePage1)
router.patch('/active_CoursePage1/:_id', active_CoursePage1)
router.get('/get_One_CoursePage1/:_id', get_One_CoursePage1)
router.get("/get_All_CoursePage1", get_All_CoursePage1)
router.get('/pagination_CoursePage1', pagination_CoursePage1)

module.exports = router  