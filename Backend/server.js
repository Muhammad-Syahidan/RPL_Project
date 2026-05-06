const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000; // Standar port untuk backend

// Middleware
app.use(cors()); // Mengizinkan akses dari frontend
app.use(express.json()); // Agar server bisa membaca format JSON

// Route dasar untuk testing
app.get('/api/test', (req, res) => {
  res.json({ message: "Halo! Server backend Shan's Cake sudah berhasil berjalan!" });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server sedang berjalan di http://localhost:${PORT}`);
});