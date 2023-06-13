const express = require('express')
const router = express.Router()
const multer = require('multer');

// Menggunakan multer untuk memproses multipart/form-data (gambar)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 30 * 1024 * 1024, // 5 MB file size limit
  },
});

// Controller Module
const forumController = require('../controllers/forum')

// Middleware
const auth = require("../middleware/auth");

// ENDPOINT
router.post('/api/forum/user/posts', upload.single('image'), auth.verifyToken, forumController.createPost)
router.get('/api/forum/posts', forumController.getAllPost)
router.get('/api/forum/:id/posts', forumController.getPostById)
router.put('/api/forum/user/:id/posts', auth.verifyToken, forumController.updatePost)
router.delete('/api/forum/user/:id/posts', auth.verifyToken, forumController.deletePost)

module.exports = router