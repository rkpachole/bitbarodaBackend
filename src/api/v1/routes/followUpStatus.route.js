const { add_FollowUpStatus,
    remove_FollowUpStatus,
    edit_FollowUpStatus,
    get_One_FollowUpStatus,
    get_All_FollowUpStatus,
    search_FollowUpStatus,
    active_FollowUpStatus,
    pagination_FollowUpStatus } = require('../controllers/followUpStatus.controller')
const express = require('express')
const router = express.Router()

router.post('/add_FollowUpStatus', add_FollowUpStatus)
router.patch('/remove_FollowUpStatus/:_id', remove_FollowUpStatus)
router.patch('/edit_FollowUpStatus/:_id', edit_FollowUpStatus)
router.get('/search_FollowUpStatus', search_FollowUpStatus)
router.patch('/active_FollowUpStatus/:_id', active_FollowUpStatus)
router.get('/get_One_FollowUpStatus/:_id', get_One_FollowUpStatus)
router.get("/get_All_FollowUpStatus", get_All_FollowUpStatus)
router.get('/pagination_FollowUpStatus', pagination_FollowUpStatus)

module.exports = router  