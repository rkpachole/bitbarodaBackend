const { add_LeadStatus,
    remove_LeadStatus,
    edit_LeadStatus,
    get_One_LeadStatus,
    get_All_LeadStatus,
    search_LeadStatus,
    active_LeadStatus,
 pagination_LeadStatus } = require('../controllers/leadStatus.controller')
const express = require('express')
const router = express.Router()

router.post('/add_LeadStatus', add_LeadStatus)
router.patch('/remove_LeadStatus/:_id', remove_LeadStatus)
router.patch('/edit_LeadStatus/:_id', edit_LeadStatus)
router.get('/search_LeadStatus', search_LeadStatus)
router.patch('/active_LeadStatus/:_id', active_LeadStatus)
router.get('/get_One_LeadStatus/:_id', get_One_LeadStatus)
router.get("/get_All_LeadStatus", get_All_LeadStatus)
router.get('/pagination_LeadStatus', pagination_LeadStatus)

module.exports = router  