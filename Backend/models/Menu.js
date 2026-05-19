const db = require('../config/db');

const createMenuTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS produk (
      id_produk INT AUTO_INCREMENT PRIMARY KEY,
      nama_varian VARCHAR(255) NOT NULL,
      deskripsi_topping TEXT,
      harga INT NOT NULL,
      stok INT DEFAULT 0,
      foto VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  try {
    await db.query(query);
    console.log('✅ Tabel "produk" sudah siap digunakan!');
  } catch (error) {
    console.error('❌ Gagal membuat tabel produk:', error.message);
  }
};

module.exports = { createMenuTable };