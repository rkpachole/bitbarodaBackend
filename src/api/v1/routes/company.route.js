const { add_Company,
    remove_Company,
    edit_Company,
    get_One_Company,
    get_All_Company,
    search_Company,
    active_Company,
    pagination_Company } = require('../controllers/company.controller')
const express = require('express')
const router = express.Router()

router.post('/add_Company', add_Company)
router.patch('/remove_Company/:_id', remove_Company)
router.patch('/edit_Company/:_id', edit_Company)
router.get('/search_Company', search_Company)
router.patch('/active_Company/:_id', active_Company)
router.get('/get_One_Company/:_id', get_One_Company)
router.get("/get_All_Company", get_All_Company)
router.get('/pagination_Company', pagination_Company)

module.exports = router  