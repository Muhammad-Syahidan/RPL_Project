const mysql = require('mysql2/promise');
require('dotenv').config(); // Membaca data dari file .env

// Membuat antrean koneksi (Connection Pool)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Mengetes koneksi saat file ini dipanggil
db.getConnection()
  .then(() => {
    console.log('✅ Berhasil terhubung ke database MySQL (Laragon)!');
  })
  .catch((err) => {
    console.error('❌ Gagal terhubung ke database:', err.message);
  });

module.exports = db;