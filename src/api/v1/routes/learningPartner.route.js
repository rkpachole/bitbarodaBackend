const { add_LearningPartner,
    remove_LearningPartner,
    edit_LearningPartner,
    get_One_LearningPartner,
    get_All_LearningPartner,
    search_learningPartner,
    active_LearningPartner,
    pagination_LearningPartner } = require('../controllers/learningPartner.controler')
const express = require('express')
const router = express.Router()

router.post('/add_LearningPartner', add_LearningPartner)
router.patch('/remove_LearningPartner/:_id', remove_LearningPartner)
router.patch('/edit_LearningPartner/:_id', edit_LearningPartner)
router.get('/search_learningPartner', search_learningPartner)
router.patch('/active_LearningPartner/:_id', active_LearningPartner)
router.get('/get_One_LearningPartner/:_id', get_One_LearningPartner)
router.get("/get_All_LearningPartner", get_All_LearningPartner)
router.get('/pagination_LearningPartner', pagination_LearningPartner)

module.exports = router  