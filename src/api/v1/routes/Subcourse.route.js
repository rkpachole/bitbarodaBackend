const { add_Subcourse,
    remove_Subcourse,
    edit_Subcourse,
    get_One_Subcourse,
    get_All_Subcourse,
    search_Subcourse,
    active_Subcourse,
    pagination_Subcourse } = require('../controllers/subcourse.controller')
const express = require('express')
const router = express.Router()

router.post('/add_Subcourse', add_Subcourse)
router.patch('/remove_Subcourse/:_id', remove_Subcourse)
router.patch('/edit_Subcourse/:_id', edit_Subcourse)
router.get('/search_Subcourse', search_Subcourse)
router.patch('/active_Subcourse/:_id', active_Subcourse)
router.get('/get_One_Subcourse/:_id', get_One_Subcourse)
router.get("/get_All_Subcourse", get_All_Subcourse)
router.get('/pagination_Subcourse', pagination_Subcourse)

module.exports = router  