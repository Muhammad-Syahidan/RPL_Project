import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate untuk pindah halaman
import axios from 'axios'; // 2. Import axios untuk kirim data ke backend
import './LoginPages.css';

export default function LoginPages() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate(); // Inisialisasi navigasi

  // Fungsi Login menggunakan Nomor HP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Menggabungkan kode negara dengan nomor yang diketik
    const fullPhoneNumber = `+62${phoneNumber}`;
    
    try {
      // Karena kita belum memasang API OTP asli (seperti Firebase SMS),
      // kita mengirim data ini langsung ke backend MySQL sebagai registrasi/login
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        name: `User ${phoneNumber}`, // Nama sementara
        phone_number: fullPhoneNumber,
        email: `${phoneNumber}@pelanggan.com` // Email sementara agar database tidak error
      });

      alert("OTP Berhasil Diverifikasi! " + response.data.message);
      
      // Jika berhasil login, langsung arahkan ke halaman utama (Landing Page)
      navigate('/');
    } catch (error) {
      console.error("Gagal login:", error);
      alert("Terjadi kesalahan saat mencoba terhubung ke server.");
    }
  };

  // Fungsi Login menggunakan Sosial Media (Google, Facebook, dll)
  const handleSocialLogin = async (platform: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        name: `Pengguna ${platform}`,
        email: `user@${platform.toLowerCase()}.com`,
        google_id: platform === 'Google' ? `google_${Date.now()}` : null, // ID unik pura-pura
      });

      alert(`Berhasil login menggunakan ${platform}! Pesan server: ${response.data.message}`);
      
      // Langsung arahkan ke halaman utama
      navigate('/');
    } catch (error) {
      console.error(`Gagal login dengan ${platform}:`, error);
      alert("Terjadi kesalahan saat mencoba login sosial media.");
    }
  };

  return (
    <div className="login-container">
      {/* Bagian Kiri: Area Visual */}
      <div className="login-visual">
        {/* Nantinya letakkan tag <img> untuk aset visual kiri di sini */}
      </div>

      {/* Bagian Kanan: Form Registrasi/Login */}
      <div className="login-form-section">
        <div className="header-wrapper">
          <h1 className="title">Halo,<br />Brownie!</h1>
          <img className="logo" src="./src/assets/logo.png" alt="logo" />
        </div>

        <form onSubmit={handleSendOTP} className="form-container">
          <label className="input-label">Masukkan Nomor Whatsapp :</label>
          
          <div className="input-group">
            <span className="flag-icon">🇮🇩</span>
            <span className="country-code">+62</span>
            <input
              type="tel"
              className="phone-input"
              placeholder="812-4547-2357"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))} // Hanya menerima angka
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            Kirim kode OTP
          </button>
        </form>

        <div className="social-login-section">
          <p className="social-text">Atau login <span className="text-orange">menggunakan</span></p>
          <div className="social-icons">
            {/* Menambahkan onClick pada masing-masing tombol sosial media */}
            <button className="icon-circle google" onClick={() => handleSocialLogin('Google')}>G</button>
            <button className="icon-circle fb" onClick={() => handleSocialLogin('Facebook')}>f</button>
            <button className="icon-circle x" onClick={() => handleSocialLogin('X')}>𝕏</button>
          </div>
        </div>
      </div>
    </div>
  );
}