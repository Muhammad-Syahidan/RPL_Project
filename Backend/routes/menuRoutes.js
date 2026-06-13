const express = require('express');
const router = express.Router();
const { getAllMenus, getMenuById, createMenu, updateMenu, deleteMenu } = require('../controllers/menuController');
const upload = require('../middlewares/upload'); // Import multer

// Rute untuk mendapatkan semua menu
router.get('/', getAllMenus);

// Rute untuk mendapatkan satu menu berdasarkan ID (PENTING untuk halaman edit)
router.get('/:id', getMenuById);

// Rute untuk membuat menu baru
router.post('/', upload.single('foto'), createMenu);

// Rute untuk update (EDIT) menu
// Kita gunakan 'foto' sebagai key, sesuaikan dengan nama field di FormData frontend Anda
router.put('/:id', upload.single('foto'), updateMenu); 

// Rute untuk hapus
router.delete('/:id', deleteMenu);

module.exports = router;