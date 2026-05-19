const db = require('../config/db');

// Fungsi mengambil data produk (untuk ditampilkan di catalog)
const getAllMenus = async (req, res) => {
  try {
    // Sesuaikan nama tabel ke 'produk'
    const [produk] = await db.query('SELECT * FROM produk'); 
    res.status(200).json(produk);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Gagal mengambil data produk.' });
  }
};

// Fungsi BARU: Menambahkan produk dari halaman Admin
const createMenu = async (req, res) => {
  // Sesuaikan variabel dengan nama kolom baru: nama_varian, deskripsi_topping, harga, stok
  const { nama_varian, deskripsi_topping, harga, stok } = req.body;
  
  // Jika ada file yang diupload, simpan namanya ke kolom 'foto'
  const foto = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '';

  try {
    // Sesuaikan Query INSERT ke tabel 'produk' dan kolom-kolom barunya
    const query = 'INSERT INTO produk (nama_varian, deskripsi_topping, harga, stok, foto) VALUES (?, ?, ?, ?, ?)';
    await db.query(query, [nama_varian, deskripsi_topping || '', harga, stok || 0, foto]);
    
    res.status(201).json({ message: 'Produk baru berhasil ditambahkan!' });
  } catch (error) {
    console.error('Error saat tambah produk:', error.message);
    res.status(500).json({ message: 'Gagal menyimpan produk ke database.' });
  }
};

module.exports = { getAllMenus, createMenu };