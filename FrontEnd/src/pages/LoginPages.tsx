import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Tambahkan import ini
import './LoginPages.css';

import browniesBg from '../assets/browniesFull.png';
import logo from '../assets/logo.png';
import browniesLapis from '../assets/browniesLapis.png';
import backgroundBulat from '../assets/background_bulat.png';

import googleIcon from '../assets/googleLogo.png';
import facebookIcon from '../assets/facebookLogo.png';
import xIcon from '../assets/Xlogo.png';

export default function LoginPages() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate(); // 2. Inisialisasi navigate

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Logika pengiriman nomor telepon bisa ditaruh di sini
    const fullNumber = `+62${phoneNumber}`;
    console.log(fullNumber);

    // 3. Navigasi ke halaman OTP
    navigate('/otp'); 
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">

        {/* LEFT SIDE */}
        <div
          className="login-visual"
          style={{ backgroundImage: `url(${browniesBg})` }}
        ></div>

        {/* RIGHT SIDE */}
        <div className="login-form-section">
          <div className="header-wrapper">
            <h1 className="title">Halo,<br />Brownie!</h1>
            <img src={logo} className="logo" alt="logo" />
          </div>

          <form onSubmit={handleSendOTP} className="form-container">
            <label className="input-label">Masukkan Nomor Whatsapp :</label>

            <div className="input-group">
              <span className="flag-icon">🇮🇩</span>
              <span className="country-code">+62</span>
              <input
                type="tel"
                className="phone-input"
                placeholder="812-3456-7890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
              />
            </div>

            <button type="submit" className="btn-submit">
              Kirim kode OTP
            </button>
          </form>

          <div className="social-login-section">
            <p className="social-text">Atau login <span>menggunakan</span></p>
            <div className="social-icons">
              <button className="social-btn">
                <img src={googleIcon} alt="Google" />
              </button>
              <button className="social-btn">
                <img src={facebookIcon} alt="Facebook" />
              </button>
              <button className="social-btn">
                <img src={xIcon} alt="X" />
              </button>
            </div>
          </div>

          <div className="bottom-decoration">
            <img src={backgroundBulat} className="circle-bg" alt="" />
            <img src={browniesLapis} className="brownies-lapis" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}