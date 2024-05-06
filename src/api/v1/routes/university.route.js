const { add_University,
    remove_University,
    edit_University,
    get_One_University,
    get_All_University,
    active_University,
    search_University,
    pagination_University } = require('../controllers/university.controller')
const express = require('express')
const router = express.Router()

router.post('/add_university', add_University)
router.get('/search_university', search_University)
router.patch('/remove_university/:_id', remove_University)
router.patch('/edit_university/:_id', edit_University)
router.patch('/active_university/:_id', active_University)
router.get('/get_One_university/:_id', get_One_University)
router.get("/get_All_university", get_All_University)
router.get('/pagination_university', pagination_University)

module.exports = router  