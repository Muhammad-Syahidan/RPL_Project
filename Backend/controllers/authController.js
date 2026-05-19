const db = require('../config/db');

const loginUser = async (req, res) => {
  // Menerima data yang dikirim dari Frontend (React)
  const { name, email, google_id, facebook_id, phone_number } = req.body;

  try {
    // Skenario 1: Jika user login menggunakan Google
    if (google_id) {
      // Cek apakah user sudah terdaftar di database
      const [existingUser] = await db.query(
        'SELECT * FROM users WHERE google_id = ? OR email = ?', 
        [google_id, email]
      );

      // Jika sudah ada, langsung berikan akses
      if (existingUser.length > 0) {
        return res.status(200).json({ 
          message: 'Login berhasil!', 
          user: existingUser[0] 
        });
      }

      // Jika belum ada, simpan sebagai user baru
      const [result] = await db.query(
        'INSERT INTO users (name, email, google_id) VALUES (?, ?, ?)',
        [name, email, google_id]
      );

      return res.status(201).json({ 
        message: 'Akun baru berhasil didaftarkan!', 
        userId: result.insertId 
      });
    }

    // Skenario untuk Facebook & OTP bisa kita tambahkan di sini nanti
    
    return res.status(400).json({ message: 'Metode login tidak dikenali atau data tidak lengkap.' });

  } catch (error) {
    console.error('Error saat login:', error.message);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server backend.' });
  }
};

module.exports = { loginUser };