const { add_Branch,
    remove_Branch,
    edit_Branch,
    get_One_Branch,
    get_All_Branch,
    search_Branch,
    active_Branch,
    pagination_Branch} = require('../controllers/branch.controller')
const express = require('express')
const router = express.Router()

router.post('/add_Branch', add_Branch)
router.patch('/remove_Branch/:_id', remove_Branch)
router.patch('/edit_Branch/:_id', edit_Branch)
router.get('/search_Branch', search_Branch)
router.patch('/active_Branch/:_id', active_Branch)
router.get('/get_One_Branch/:_id', get_One_Branch)
router.get("/get_All_Branch", get_All_Branch)
router.get('/pagination_Branch', pagination_Branch)

module.exports = router  