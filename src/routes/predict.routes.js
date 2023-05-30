const express = require('express')
const router = express.Router()
const predictController = require("../controllers/predict")

router.post("/api/predict",predictController.getPredict)

module.exports = router