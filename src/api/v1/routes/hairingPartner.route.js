const { add_HairingPartner,
    remove_HairingPartner,
    edit_HairingPartner,
    get_One_HairingPartner,
    get_All_HairingPartner,
    search_HairingPartner,
    active_HairingPartner,
    pagination_HairingPartner } = require('../controllers/hairingParter.controller')
const express = require('express')
const router = express.Router()

router.post('/add_HairingPartner', add_HairingPartner)
router.patch('/remove_HairingPartner/:_id', remove_HairingPartner)
router.patch('/edit_HairingPartner/:_id', edit_HairingPartner)
router.get('/search_HairingPartner', search_HairingPartner)
router.patch('/active_HairingPartner/:_id', active_HairingPartner)
router.get('/get_One_HairingPartner/:_id', get_One_HairingPartner)
router.get("/get_All_HairingPartner", get_All_HairingPartner)
router.get('/pagination_HairingPartner', pagination_HairingPartner)

module.exports = router  