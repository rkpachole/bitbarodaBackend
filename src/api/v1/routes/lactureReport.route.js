const { add_LactureReport,
    remove_LactureReport,
    edit_LactureReport,
    get_One_LactureReport,
    get_All_LactureReport,
    search_LactureReport,
    active_LactureReport,
    pagination_LactureReport } = require('../controllers/lactureReport.controller')
const express = require('express')
const router = express.Router()

router.post('/add_LactureReport', add_LactureReport)
router.patch('/remove_LactureReport/:_id', remove_LactureReport)
router.patch('/edit_LactureReport/:_id', edit_LactureReport)
router.get('/search_LactureReport', search_LactureReport)
router.patch('/active_LactureReport/:_id', active_LactureReport)
router.get('/get_One_LactureReport/:_id', get_One_LactureReport)
router.get("/get_All_LactureReport", get_All_LactureReport)
router.get('/pagination_LactureReport', pagination_LactureReport)

module.exports = router  