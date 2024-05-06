const {add_Category, 
    remove_Category,
    edit_Category,
    get_One_Category,
    get_All_Category,
    active_Category,
    search_Category,
    pagination_Category} = require('../controllers/category.controller')
const express = require('express')
const router = express.Router()
 
router.post('/add_Category',add_Category)
router.patch('/remove_Category/:_id',remove_Category)
router.patch('/edit_Category/:_id',edit_Category)
 router.get('/search_Category', search_Category)
router.patch('/active_Category/:_id', active_Category)
router.get('/get_One_category/:_id', get_One_Category)
router.get("/get_All_category", get_All_Category)
router.get('/pagination_Category', pagination_Category)

module.exports = router  