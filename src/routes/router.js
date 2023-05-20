const express = require('express')
const router = express.Router()

// CONTROLLER MODULE
const message = require('../controllers/message')
const usersController = require('../controllers/users')

// ENDPOINT
router.get('/', message.helloworld)
router.post('/api/register', usersController.register)
router.post('/api/login', usersController.login)


/* Example for (message: testing)
    router.get('/testing', message.testing)
*/

module.exports = router