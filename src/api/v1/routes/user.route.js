const { add_User,
    remove_User,
    edit_User,
    get_One_User,
    get_All_User,
    active_User,
    search_User,
    pagination_User} = require('../controllers/user.Controller')
const express = require('express')
const router = express.Router()

router.post('/add_User', add_User)
router.get('/search_User', search_User)
router.patch('/remove_User/:_id', remove_User)
router.patch('/edit_User/:_id', edit_User)
router.patch('/active_User/:_id', active_User)
router.get('/get_One_User/:_id', get_One_User)
router.get("/get_All_User", get_All_User)
router.get('/pagination_User', pagination_User)

module.exports = router  