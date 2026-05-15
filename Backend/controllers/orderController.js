const db = require('../config/db');

// Mengambil semua pesanan untuk ditampilkan di Dashboard Admin
const getAllOrders = async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error ambil pesanan:', error.message);
    res.status(500).json({ message: 'Gagal mengambil data pesanan.' });
  }
};

// Memperbarui status pesanan (misal: Pending -> Diproses -> Selesai)
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    res.status(200).json({ message: 'Status pesanan berhasil diperbarui!' });
  } catch (error) {
    console.error('Error update status:', error.message);
    res.status(500).json({ message: 'Gagal memperbarui status.' });
  }
};

// Fungsi createOrder yang lama tetap ada di sini...
const createOrder = async (req, res) => { /* ... kode lama ... */ };

module.exports = { createOrder, getAllOrders, updateOrderStatus };