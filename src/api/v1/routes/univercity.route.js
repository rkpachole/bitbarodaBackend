const {add_Univercity, 
    remove_Univercity,
    edit_Univercity,
    get_One_Univercity,
    get_All_Univercity,
    active_Univercity,
    search_Univercity,
    pagination_Univercity } = require('../controllers/univercity.controller')
const express = require('express')
const router = express.Router()
 
router.post('/add_Univercity',add_Univercity)
router.get('/search_Univercity', search_Univercity)
router.patch('/remove_Univercity/:_id',remove_Univercity)
router.patch('/edit_Univercity/:_id',edit_Univercity)
router.patch('/active_Univercity/:_id', active_Univercity)
router.get('/get_One_Univercity/:_id',get_One_Univercity)
router.get("/get_All_Univercity",get_All_Univercity)
router.get('/pagination_Univercity', pagination_Univercity)

module.exports = router  