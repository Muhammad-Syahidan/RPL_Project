import { useState } from 'react';
import './LoginPages.css';

export default function LoginPages() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika untuk mengirim OTP (misal memanggil API backend Shan's Cake)
    console.log('Mengirim OTP ke nomor: +62', phoneNumber);
  };

  return (
    <div className="login-container">
      {/* Bagian Kiri: Area Visual (Cipratan cokelat dan brownies) */}
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
            {/* Ganti dengan ikon SVG yang sebenarnya */}
            <button className="icon-circle google">G</button>
            <button className="icon-circle fb">f</button>
            <button className="icon-circle x">𝕏</button>
          </div>
        </div>
      </div>
    </div>
  );
}