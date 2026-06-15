require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); 
const db = require('./config/db'); 

// Import tabel
const { createUserTable } = require('./models/User');
const { createMenuTable } = require('./models/Menu');

const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const transaksiRoutes = require('./routes/transaksiRoutes'); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// LOGIKA DATABASE
const initDatabase = async () => {
  try {
    // await createUserTable();
    // await createMenuTable();
  } catch (error) {
    console.error("Gagal menginisialisasi database:", error);
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/transaksi', transaksiRoutes); 

app.get('/api/test', (req, res) => {
  res.json({ message: "Halo! Server backend Shan's Cake sudah berhasil berjalan!" });
});

// ROUTE LAPORAN (DIPERBARUI DENGAN FILTER)
app.get('/api/laporan', async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    let sql = `
      SELECT 
        t.id_transaksi, 
        GROUP_CONCAT(p.nama_varian SEPARATOR ', ') AS namaProduk, 
        t.total_bayar, 
        t.tanggal_waktu AS tanggal, 
        t.status 
      FROM transaksi t
      LEFT JOIN detail_transaksi dt ON t.id_transaksi = dt.id_transaksi
      LEFT JOIN produk p ON dt.id_produk = p.id_produk
    `;

    const params = [];

    // Logika filter tanggal
    if (startDate && endDate) {
      sql += ` WHERE DATE(t.tanggal_waktu) BETWEEN ? AND ?`;
      params.push(startDate, endDate);
    }

    sql += ` GROUP BY t.id_transaksi ORDER BY t.tanggal_waktu DESC`;

    const [rows] = await db.execute(sql, params);
    res.json(rows);
  } catch (error) {
    console.error("Gagal mengambil laporan:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
});

app.listen(PORT, () => {
  console.log(`Server sedang berjalan di http://localhost:${PORT}`);
});