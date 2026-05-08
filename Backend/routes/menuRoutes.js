const express = require('express');
const router = express.Router();
const { getAllMenus } = require('../controllers/menuController');

// Membuat URL: GET /api/menus
router.get('/', getAllMenus);

module.exports = router;