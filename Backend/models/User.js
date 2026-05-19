const db = require('../config/db');

// Fungsi untuk membuat tabel otomatis jika belum ada
const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE,
      phone_number VARCHAR(20) UNIQUE,
      google_id VARCHAR(255) UNIQUE,
      facebook_id VARCHAR(255) UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  try {
    await db.query(query);
    console.log('✅ Tabel "users" sudah siap digunakan di database!');
  } catch (error) {
    console.error('❌ Gagal membuat tabel users:', error.message);
  }
};

module.exports = { createUserTable };