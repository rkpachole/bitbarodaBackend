const { add_Specialization,
    remove_Specialization,
    edit_Specialization,
    get_One_Specialization,
    get_All_Specialization,
    search_Specialization,
    active_Specialization,
    pagination_Specialization } = require('../controllers/specialization.controller')
const express = require('express')
const router = express.Router()

router.post('/add_Specialization', add_Specialization)
router.patch('/remove_Specialization/:_id', remove_Specialization)
router.patch('/edit_Specialization/:_id', edit_Specialization)
router.get('/search_Specialization', search_Specialization)
router.patch('/active_Specialization/:_id', active_Specialization)
router.get('/get_One_Specialization/:_id', get_One_Specialization)
router.get("/get_All_Specialization", get_All_Specialization)
router.get('/pagination_Specialization', pagination_Specialization)

module.exports = router  