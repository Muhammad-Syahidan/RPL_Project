const db = require('../config/db');

// Fungsi mengambil semua menu
const getAllMenus = async (req, res) => {
  try {
    const [produk] = await db.query('SELECT * FROM produk');
    res.status(200).json(produk);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Gagal mengambil data produk.' });
  }
};

// Fungsi ambil data per ID
const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const [produk] = await db.query('SELECT * FROM produk WHERE id_produk = ?', [id]);
    if (produk.length === 0) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.status(200).json(produk[0]);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data produk.' });
  }
};

// Fungsi Update data
const updateMenu = async (req, res) => {
  const { id } = req.params;
  const { nama_varian, deskripsi_topping, harga } = req.body;
  const foto = req.file ? req.file.filename : null;

  try {
    if (foto) {
      const query = 'UPDATE produk SET nama_varian = ?, deskripsi_topping = ?, harga = ?, foto = ? WHERE id_produk = ?';
      await db.query(query, [nama_varian, deskripsi_topping || '', harga, foto, id]);
    } else {
      const query = 'UPDATE produk SET nama_varian = ?, deskripsi_topping = ?, harga = ? WHERE id_produk = ?';
      await db.query(query, [nama_varian, deskripsi_topping || '', harga, id]);
    }
    res.status(200).json({ message: 'Produk berhasil diperbarui!' });
  } catch (error) {
    console.error('Error saat update:', error.message);
    res.status(500).json({ message: 'Gagal update produk.' });
  }
};

// Fungsi tambah menu baru
const createMenu = async (req, res) => {
  // 1. Hapus 'stok' dari req.body
  const { nama_varian, deskripsi_topping, harga } = req.body;
  const foto = req.file ? req.file.filename : ''; 

  try {
    // 2. Hapus 'stok' dari daftar kolom dan kurangi jumlah tanda '?'
    const query = 'INSERT INTO produk (nama_varian, deskripsi_topping, harga, foto) VALUES (?, ?, ?, ?)';
    
    // 3. Pastikan urutan dan jumlah data sesuai dengan kolom di atas
    await db.query(query, [nama_varian, deskripsi_topping || '', harga, foto]);
    
    res.status(201).json({ message: 'Produk baru berhasil ditambahkan!' });
  } catch (error) {
    console.error('Error saat tambah produk:', error.message);
    res.status(500).json({ message: 'Gagal menyimpan produk ke database.' });
  }
};

// FUNGSI DELETE (yang tadi hilang)
const deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM produk WHERE id_produk = ?';
    await db.query(query, [id]);
    res.status(200).json({ message: 'Produk berhasil dihapus!' });
  } catch (error) {
    console.error('Error saat hapus:', error.message);
    res.status(500).json({ message: 'Gagal menghapus produk.' });
  }
};

// Pastikan semua fungsi di-export ke routes
module.exports = { 
  getAllMenus, 
  getMenuById, 
  updateMenu, 
  createMenu, 
  deleteMenu 
};