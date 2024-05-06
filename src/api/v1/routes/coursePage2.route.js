const { add_CoursePage2,
    remove_CoursePage2,
    edit_CoursePage2,
    get_One_CoursePage2,
    get_All_CoursePage2,
    search_CoursePage2,
    active_CoursePage2,
    pagination_CoursePage2 } = require('../controllers/coursePage2.controller')
const express = require('express')
const router = express.Router()

router.post('/add_CoursePage2', add_CoursePage2)
router.patch('/remove_CoursePage2/:_id', remove_CoursePage2)
router.patch('/edit_CoursePage2/:_id', edit_CoursePage2)
router.get('/search_CoursePage2', search_CoursePage2)
router.patch('/active_CoursePage2/:_id', active_CoursePage2)
router.get('/get_One_CoursePage2/:_id', get_One_CoursePage2)
router.get("/get_All_CoursePage2", get_All_CoursePage2)
router.get('/pagination_CoursePage2', pagination_CoursePage2)

module.exports = router  