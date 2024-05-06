const { add_Source,
    remove_Source,
    edit_Source,
    get_One_Source,
    get_All_Source,
    search_Source,
    active_Source,
    pagination_Source } = require('../controllers/source.controller')
const express = require('express')
const router = express.Router()

router.post('/add_Source', add_Source)
router.patch('/remove_Source/:_id', remove_Source)
router.patch('/edit_Source/:_id', edit_Source)
router.get('/search_Source', search_Source)
router.patch('/active_Source/:_id', active_Source)
router.get('/get_One_Source/:_id', get_One_Source)
router.get("/get_All_Source", get_All_Source)
router.get('/pagination_Source', pagination_Source)

module.exports = router  