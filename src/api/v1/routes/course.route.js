
const express = require('express')
const router = express.Router()
const { singleUpload } = require('../middlewares/upload')
const { add_Course, remove_Course, edit_Course, get_One_Course, get_All_Course, search_Course, active_Course, add_Course_file, get_All_FrontendCourse, get_All_BackendCourse, pagination_Course, get_All_Individual_Course, search_Course_Individual } = require('../controllers/course.controller')

router.post('/add_Course', singleUpload, add_Course)
router.post('/add_Course_file', singleUpload, add_Course_file)
router.patch('/remove_Course/:_id', remove_Course)
router.get('/search_Course', search_Course)
router.get('/search_Course_Individual', search_Course_Individual)
router.patch('/active_Course/:_id', active_Course)
router.post('/edit_Course/:_id', edit_Course)
router.get('/get_One_Course/:_id', get_One_Course)
router.get("/get_All_Course", get_All_Course)
router.get("/get_All_BackendCourse", get_All_BackendCourse)
router.get("/get_All_FrontendCourse", get_All_FrontendCourse)
router.get("/get_All_Individual_Course",get_All_Individual_Course)

// router.get('/pagination_Course', pagination_Course)



module.exports = router