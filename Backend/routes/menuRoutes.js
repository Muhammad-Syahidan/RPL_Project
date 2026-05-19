const express = require('express');
const router = express.Router();
const { getAllMenus, createMenu } = require('../controllers/menuController');
const upload = require('../middlewares/upload'); // <-- Import multer

router.get('/', getAllMenus);

// Menyisipkan upload.single('image_file') sebelum masuk ke createMenu
router.post('/', upload.single('image_file'), createMenu); 

module.exports = router;