const db = require('../config/db');

// Fungsi mengambil data menu (yang tadi)
const getAllMenus = async (req, res) => {
  try {
    const [menus] = await db.query('SELECT * FROM menus WHERE is_available = TRUE');
    res.status(200).json(menus);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Gagal mengambil data menu.' });
  }
};

// Fungsi BARU: Menambahkan menu dari halaman Admin
const createMenu = async (req, res) => {
  const { name, description, price, image_url } = req.body;

  try {
    const query = 'INSERT INTO menus (name, description, price, image_url) VALUES (?, ?, ?, ?)';
    await db.query(query, [name, description, price, image_url]);
    
    res.status(201).json({ message: 'Menu kue baru berhasil ditambahkan ke katalog!' });
  } catch (error) {
    console.error('Error saat tambah menu:', error.message);
    res.status(500).json({ message: 'Gagal menyimpan menu ke database.' });
  }
};

// Jangan lupa export fungsi barunya
module.exports = { getAllMenus, createMenu };