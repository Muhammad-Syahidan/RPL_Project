const db = require('../config/db');

const createOrderTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      customer_name VARCHAR(100) NOT NULL,
      customer_address TEXT,
      product_name VARCHAR(100) NOT NULL,
      toppings TEXT,
      shipping_method VARCHAR(50),
      payment_method VARCHAR(50),
      total_price INT NOT NULL,
      status VARCHAR(50) DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  try {
    await db.query(query);
    console.log('✅ Tabel "orders" sudah siap digunakan!');
  } catch (error) {
    console.error('❌ Gagal membuat tabel orders:', error.message);
  }
};

module.exports = { createOrderTable };