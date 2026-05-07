require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); 
const { createUserTable } = require('./models/User');

// 1. Import file routes yang baru kita buat
const authRoutes = require('./routes/authRoutes'); // <-- Tambahkan ini

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

createUserTable();

// 2. Aktifkan routes tersebut
app.use('/api/auth', authRoutes); // <-- Tambahkan ini

app.get('/api/test', (req, res) => {
  res.json({ message: "Halo! Server backend Shan's Cake sudah berhasil berjalan!" });
});

app.listen(PORT, () => {
  console.log(`Server sedang berjalan di http://localhost:${PORT}`);
});