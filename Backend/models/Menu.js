const db = require('../config/db');

const createMenuTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS menus (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price INT NOT NULL,
      image_url VARCHAR(255),
      is_available BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  try {
    await db.query(query);
    console.log('✅ Tabel "menus" sudah siap digunakan!');
  } catch (error) {
    console.error('❌ Gagal membuat tabel menus:', error.message);
  }
};

module.exports = { createMenuTable };