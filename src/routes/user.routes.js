const express = require('express')
const router = express.Router()

// CONTROLLER MODULE
const message = require('../controllers/message')
const usersController = require('../controllers/users')

// Middleware
const auth = require("../middleware/auth");

// ENDPOINT
router.get('/', message.helloworld)
router.get('/api/user/profile', auth.verifyToken, usersController.getProfile)
router.post('/api/user/register', usersController.register)
router.post('/api/user/login', usersController.login)

module.exports = router