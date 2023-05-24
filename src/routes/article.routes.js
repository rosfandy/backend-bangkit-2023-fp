const express = require('express')
const router = express.Router()
const articleController = require("../controllers/article")

router.get("/articles",articleController.getArticles)
router.get("/sheet/:id",articleController.saveArticles)

module.exports = router