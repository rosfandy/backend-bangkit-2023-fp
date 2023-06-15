const express = require('express')
const router = express.Router()

// CONTROLLER MODULE
const message = require('../controllers/message')
const usersController = require('../controllers/users')
const historyController = require('../controllers/history')

// Middleware
const auth = require("../middleware/auth");

// ENDPOINT
router.get('/', message.helloworld)
router.get('/api/user/profile', auth.verifyToken, usersController.getProfile)
router.get('/api/user/refreshtoken', usersController.refreshToken)
router.get('/api/user/history', usersController.history)
router.post('/api/user/register', usersController.register)
router.post('/api/user/login', usersController.login)
router.get('/api/user/history', auth.verifyToken, historyController.getHistory)

module.exports = router