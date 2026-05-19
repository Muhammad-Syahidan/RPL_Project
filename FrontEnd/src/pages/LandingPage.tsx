import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

// Import semua aset gambar
import chocoDripImg from '../assets/ChocoDrip.png';
import bulatOrenImg from '../assets/bulatLandingPage.png';
import bulatCokelatImg from '../assets/bulatLandingPage2.png'; 
import browniesLandingImg from '../assets/browniesLandingPage.png';
import logoBenarImg from '../assets/logo2.png'; // 1. Diubah ke logo2.png (Logo Shan's Bakery & Cake yang benar)

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      
      {/* Bagian Kiri: Area Visual */}
      <div className="landing-visual">
        {/* Dekorasi Lelehan Cokelat Atas */}
        <img src={chocoDripImg} alt="Cokelat Drip" className="decor-choco-drip-top" />
        
        {/* Lapis 1: Lingkaran Cokelat Tua (Paling Belakang) */}
        <img src={bulatCokelatImg} alt="Blob Cokelat Belakang" className="decor-blob-back" />
        
        {/* Lapis 2: Lingkaran Oranye (Di Depan Lingkaran Cokelat) */}
        <img src={bulatOrenImg} alt="Blob Oranye Depan" className="decor-blob-front" />
        
        {/* Gambar Utama Brownies (Paling Depan) */}
        <img src={browniesLandingImg} alt="Tumpukan Brownies" className="main-brownie-img" />
      </div>

      {/* Bagian Kanan: Teks & Tombol */}
      <div className="landing-content">
        
        {/* Menu Navigasi Atas */}
        <div className="top-navigation">
          <span className="nav-account" onClick={() => navigate('/login')}>Account</span>
          {/* 2. Menggunakan variabel logoBenarImg yang merujuk ke logo2.png */}
          <img src={logoBenarImg} alt="Shan's Bakery & Cake Logo" className="baker-logo-landing" />
        </div>

        {/* Konten Utama */}
        <div className="text-section">
          <h1 className="landing-title">
            Let's Order<br />
            The Homemade<br />
            Cakes!
          </h1>
          
          <button 
            className="btn-order-here" 
            onClick={() => navigate('/menu')}
          >
            Order Here!
          </button>
        </div>
        
      </div>
    </div>
  );
}