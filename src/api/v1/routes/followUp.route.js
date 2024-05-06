const { add_FollowUp,
    remove_FollowUp,
    edit_FollowUp,
    get_One_FollowUp,
    get_All_FollowUp,
    search_FollowUp,
    active_FollowUp,
    pagination_FollowUp,
    get_FollowUp_ByLeadId } = require('../controllers/followUp.controller')
const express = require('express')
const router = express.Router()

router.post('/add_FollowUp', add_FollowUp)
router.patch('/remove_FollowUp/:_id', remove_FollowUp)
router.patch('/edit_FollowUp/:_id', edit_FollowUp)
router.get('/search_FollowUp', search_FollowUp)
router.patch('/active_FollowUp/:_id', active_FollowUp)
router.get('/get_One_FollowUp/:_id', get_One_FollowUp)
router.get("/get_All_FollowUp", get_All_FollowUp)
router.get('/pagination_FollowUp', pagination_FollowUp)
router.get('/get_FollowUp_ByLeadId/:_id', get_FollowUp_ByLeadId)

module.exports = router  