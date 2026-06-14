const express = require('express');
const router = express.Router();
// Import fungsi loginAdmin yang sudah kita buat di controller
const { loginAdmin } = require('../controllers/authController');

// Rute untuk Login Admin
// URL akan menjadi: POST /api/auth/admin/login
router.post('/admin/login', loginAdmin);

module.exports = router;