const express = require('express');
const router = express.Router();
// Import kedua fungsinya
const { getAllMenus, createMenu } = require('../controllers/menuController');

router.get('/', getAllMenus);     // Untuk dilihat pelanggan
router.post('/', createMenu);     // Untuk diinput oleh Admin

module.exports = router;