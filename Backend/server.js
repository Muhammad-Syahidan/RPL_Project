require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); 

// Import Model
const { createUserTable } = require('./models/User'); // <-- Tambahkan ini

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Jalankan pembuatan tabel
createUserTable(); // <-- Dan panggil fungsinya di sini

app.get('/api/test', (req, res) => {
  res.json({ message: "Halo! Server backend Shan's Cake sudah berhasil berjalan!" });
});

app.listen(PORT, () => {
  console.log(`Server sedang berjalan di http://localhost:${PORT}`);
});