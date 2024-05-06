
const express = require('express')
const router = express.Router()
const { add_Lead, remove_Lead, edit_Lead, get_One_Lead, get_All_Lead, search_Lead, active_Lead, Duplicate_Data, search_Lead_ByMobile, pagination_Lead, lead_Value } = require('../controllers/lead.controller')

router.post('/add_Lead', add_Lead)
router.patch('/remove_Lead/:_id', remove_Lead)
router.get('/search_Lead', search_Lead)
router.get('/search_Lead_ByMobile', search_Lead_ByMobile)
router.patch('/active_Lead/:_id', active_Lead)
router.post('/edit_Lead/:_id', edit_Lead)
router.get('/get_One_Lead/:_id', get_One_Lead)
router.get("/get_All_Lead", get_All_Lead)
router.post('/Duplicate_Data', Duplicate_Data)
router.get('/pagination_Lead', pagination_Lead)
router.post('/lead_Value', lead_Value)


module.exports = router