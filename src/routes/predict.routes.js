const express = require('express')
const router = express.Router()
const predictController = require("../controllers/predict")

// Middleware
const auth = require("../middleware/auth");

router.post("/api/predict",predictController.getPredict)

module.exports = router