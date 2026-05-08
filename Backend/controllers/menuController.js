const db = require('../config/db');

const getAllMenus = async (req, res) => {
  try {
    // Mengambil semua menu kue yang statusnya masih tersedia (TRUE)
    const [menus] = await db.query('SELECT * FROM menus WHERE is_available = TRUE');
    res.status(200).json(menus);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Gagal mengambil data menu dari database.' });
  }
};

module.exports = { getAllMenus };