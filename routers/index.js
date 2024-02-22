const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

// router.get('/login', Controller.home)
router.get('/cars', Controller.getAllCommanders)
// router.get('/troops', Controller.getAllTroops)
// router.get('/troops/train', Controller.getTrainTroop)
// router.post('/troops/train', Controller.postTrainTroop)

module.exports = router