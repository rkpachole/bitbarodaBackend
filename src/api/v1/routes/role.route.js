const { add_Role,
    remove_Role,
    edit_Role,
    get_One_Role,
    get_All_Role,
    search_Role,
    active_Role,
    pagination_Role } = require('../controllers/role.controller')
const express = require('express')
const router = express.Router()

router.post('/add_Role', add_Role)
router.patch('/remove_Role/:_id', remove_Role)
router.patch('/edit_Role/:_id', edit_Role)
router.get('/search_Role', search_Role)
router.patch('/active_Role/:_id', active_Role)
router.get('/get_One_Role/:_id', get_One_Role)
router.get("/get_All_Role", get_All_Role)
router.get('/pagination_Role', pagination_Role)

module.exports = router  