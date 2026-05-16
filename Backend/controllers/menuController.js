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
  const { name, description, price } = req.body;
  
  // Jika ada file yang diupload, buatkan URL-nya. Jika tidak, kosongkan.
  const image_url = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '';

  try {
    const query = 'INSERT INTO menus (name, description, price, image_url) VALUES (?, ?, ?, ?)';
    await db.query(query, [name, description || '', price, image_url]);
    
    res.status(201).json({ message: 'Menu kue baru beserta foto berhasil ditambahkan!' });
  } catch (error) {
    console.error('Error saat tambah menu:', error.message);
    res.status(500).json({ message: 'Gagal menyimpan menu ke database.' });
  }
};

// Fungsi BARU: Memperbarui data menu kue berdasarkan ID
const updateMenu = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  
  try {
    let query = 'UPDATE menus SET name = ?, price = ? WHERE id = ?';
    let params = [name, price, id];

    // Jika admin mengupload foto baru, perbarui juga kolom image_url
    if (req.file) {
      const image_url = `http://localhost:5000/uploads/${req.file.filename}`;
      query = 'UPDATE menus SET name = ?, price = ?, image_url = ? WHERE id = ?';
      params = [name, price, image_url, id];
    }

    await db.query(query, params);
    res.status(200).json({ message: 'Menu kue berhasil diperbarui!' });
  } catch (error) {
    console.error('Error saat update menu:', error.message);
    res.status(500).json({ message: 'Gagal memperbarui data menu.' });
  }
};

// Fungsi BARU: Menghapus menu dari katalog (atau mengubah status ketersediaan)
const deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    // Kita gunakan DELETE untuk benar-benar menghapus baris dari database
    await db.query('DELETE FROM menus WHERE id = ?', [id]);
    res.status(200).json({ message: 'Menu kue berhasil dihapus dari katalog!' });
  } catch (error) {
    console.error('Error saat hapus menu:', error.message);
    res.status(500).json({ message: 'Gagal menghapus menu.' });
  }
};

// Pastikan kedua fungsi baru ini di-export di paling bawah file bersama fungsi lainnya
module.exports = { getAllMenus, createMenu, updateMenu, deleteMenu };

