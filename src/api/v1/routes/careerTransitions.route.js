const {add_CareerTransitions, 
    remove_CareerTransitions,
    edit_CareerTransitions,
    get_One_careerTransitions,
    get_All_careerTransitions,
    search_CareerTransitions,
    active_CareerTransitions,
    pagination_CareerTransitions,
    get_CoursePage1_Content } = require('../controllers/careerTransition.controller')
const express = require('express')
const router = express.Router()
 
router.post('/add_CareerTransitions',add_CareerTransitions)
router.patch('/remove_CareerTransitions/:_id',remove_CareerTransitions)
router.patch('/edit_CareerTransitions/:_id',edit_CareerTransitions)
router.get('/search_CareerTransitions', search_CareerTransitions)
router.patch('/active_CareerTransitions/:_id', active_CareerTransitions)
router.get('/get_One_careerTransitions/:_id',get_One_careerTransitions)
router.get("/get_All_careerTransitions",get_All_careerTransitions)
router.get('/pagination_CareerTransitions', pagination_CareerTransitions)
router.get('/get_CoursePage1_Content/:_id', get_CoursePage1_Content)

module.exports = router  