const express = require('express')
const router = express.Router()

// CONTROLLER MODULE
const paymentController = require('../controllers/midtrans/payment')

// Middleware
const auth = require("../middleware/auth");

// ENDPOINT
router.post('/api/payment', paymentController.midtrans)

module.exports = router