const { add_StudyMaterial,
    remove_StudyMaterial,
    edit_StudyMaterial,
    get_One_StudyMaterial,
    get_All_StudyMaterial,
    search_StudyMaterial,
    active_StudyMaterial,
    pagination_StudyMaterial } = require('../controllers/studyMaterial.controller')
const express = require('express')
const router = express.Router()

router.post('/add_StudyMaterial', add_StudyMaterial)
router.patch('/remove_StudyMaterial/:_id', remove_StudyMaterial)
router.patch('/edit_StudyMaterial/:_id', edit_StudyMaterial)
router.get('/search_StudyMaterial', search_StudyMaterial)
router.patch('/active_StudyMaterial/:_id', active_StudyMaterial)
router.get('/get_One_StudyMaterial/:_id', get_One_StudyMaterial)
router.get("/get_All_StudyMaterial", get_All_StudyMaterial)
router.get('/pagination_StudyMaterial', pagination_StudyMaterial)

module.exports = router  