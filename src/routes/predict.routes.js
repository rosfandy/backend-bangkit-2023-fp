const express = require('express')
const router = express.Router()
const predictController = require("../controllers/predict")
const rateLimit = require('express-rate-limit')
const multer = require('multer');

const apiLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 60 minutes
	max: 10, // limit 10 request
	message: async (req, res) => {
		try {
			res.send({ success: true, message: "You can only make 10 requests every hour.", status:429 });
		}
		catch (e) {
			console.log(error);
    		res.status(500).send({ success: false, error: "Internal Server Error", status:500 });
		}
	},
	standardHeaders: true,
	legacyHeaders: false,
})

// Menggunakan multer untuk memproses multipart/form-data (gambar)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB file size limit
  },
});

// Apply the rate limiting 
// router.use('/api/predict', apiLimiter)

// Middleware
const auth = require("../middleware/auth");

router.post("/api/predict", upload.single('image'), auth.verifyToken, predictController.getPredict)

module.exports = router