import { useNavigate } from 'react-router-dom';
import './OtpPage.css';

import browniesBg from '../assets/browniesFull.png';
import browniesLapis from '../assets/browniesLapis.png';
import backgroundBulat from '../assets/background_bulat.png';
import bakerLogo from '../assets/logo.png'; 

export default function OtpPage() {
  const navigate = useNavigate();

  const handleConfirmOtp = () => {
    navigate('/home');
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        
        {/* SISI KIRI */}
        <div 
          className="login-visual" 
          style={{ backgroundImage: `url(${browniesBg})` }}
        ></div>

        {/* SISI KANAN */}
        <div className="login-form-section">
          
          <div className="header-wrapper">
            <h1 className="title">Halo,<br />Brownie!</h1>
            {/* Logo sekarang akan sejajar dengan teks Halo */}
            <img src={bakerLogo} className="baker-logo" alt="Baker Logo" />
          </div>

          <div className="otp-outer-wrapper">
            <div className="otp-container">
               <p className="otp-label">Masukkan Kode OTP</p>
               <div className="otp-display">1 4 8 - 5 9 8</div>
               <button className="btn-kirim-otp" onClick={handleConfirmOtp}>
                 Kirim
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