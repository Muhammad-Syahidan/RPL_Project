const db = require('../config/db');

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Mengecek apakah username dan password cocok di tabel admin
    const [rows] = await db.query(
      'SELECT * FROM admin WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      // Jika ditemukan, login sukses
      return res.status(200).json({ 
        message: 'Login berhasil!', 
        admin: { id: rows[0].id_admin, username: rows[0].username } 
      });
    } else {
      // Jika tidak ditemukan, username/password salah
      return res.status(401).json({ message: 'Username atau password salah!' });
    }
  } catch (error) {
    console.error('Error saat login admin:', error.message);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

module.exports = { loginAdmin };