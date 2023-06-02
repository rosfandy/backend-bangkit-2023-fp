const express = require('express')
const router = express.Router()
const predictController = require("../controllers/predict")
const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
	windowMs: 24 * 60 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
// Apply the rate limiting middleware to API calls only
router.use('/api/predict', apiLimiter)

// Middleware
const auth = require("../middleware/auth");

router.post("/api/predict",predictController.getPredict)

module.exports = router