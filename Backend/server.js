require('dotenv').config(); // Tambahkan ini di paling atas
const express = require('express');
const cors = require('cors');

// Memanggil koneksi database
require('./config/db'); // <-- Tambahkan baris ini

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: "Halo! Server backend Shan's Cake sudah berhasil berjalan!" });
});

app.listen(PORT, () => {
  console.log(`Server sedang berjalan di http://localhost:${PORT}`);
});