const express = require('express')
const router = express.Router()
const { add_SubCategory, remove_SubCategory, edit_SubCategory, get_One_SubCategory, get_All_SubCategory, search_SubCategory, active_SubCategory, pagination_SubCategory } = require('../controllers/subCategory.controller')
 
router.post('/add_SubCategory',add_SubCategory)
router.patch('/remove_SubCategory/:_id',remove_SubCategory)
router.get('/search_SubCategory', search_SubCategory)
router.patch('/active_SubCategory/:_id', active_SubCategory)
router.patch('/edit_SubCategory/:_id',edit_SubCategory)
router.get('/get_One_SubCategory/:_id',get_One_SubCategory)
router.get("/get_All_SubCategory",get_All_SubCategory)
router.get('/pagination_SubCategory', pagination_SubCategory)

 module.exports = router