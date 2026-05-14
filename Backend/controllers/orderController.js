const db = require('../config/db');

const createOrder = async (req, res) => {
  const { customer_name, customer_address, product_name, toppings, shipping_method, payment_method, total_price } = req.body;

  try {
    const query = 'INSERT INTO orders (customer_name, customer_address, product_name, toppings, shipping_method, payment_method, total_price) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.query(query, [
      customer_name, 
      customer_address, 
      product_name, 
      toppings, 
      shipping_method, 
      payment_method, 
      total_price
    ]);
    
    res.status(201).json({ message: 'Pesanan tersimpan di database!', orderId: result.insertId });
  } catch (error) {
    console.error('Error simpan pesanan:', error.message);
    res.status(500).json({ message: 'Gagal menyimpan data pesanan.' });
  }
};

module.exports = { createOrder };