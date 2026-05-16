const express = require('express');
const router = express.Router();
const { getAllMenus, createMenu, updateMenu, deleteMenu } = require('../controllers/menuController');
const upload = require('../middlewares/upload');

router.get('/', getAllMenus);
router.post('/', upload.single('image_file'), createMenu);

// Rute Baru untuk Update (PUT) dan Hapus (DELETE)
router.put('/:id', upload.single('image_file'), updateMenu); // Menggunakan multer jika ada ganti foto
router.delete('/:id', deleteMenu);

module.exports = router;