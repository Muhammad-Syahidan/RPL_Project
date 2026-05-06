import { useNavigate } from 'react-router-dom'; // 1. Pastikan import ini ada di paling atas
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate(); // 2. Inisialisasi useNavigate

  return (
    
    <div className="landing-container">
      
      {/* Bagian Kiri: Area Visual */}
      <div className="landing-visual">
        {/* Dekorasi Lelehan Cokelat */}
        <div className="decor-choco-drip-top">
          <span className="placeholder-text">Cokelat Drip</span>
        </div>
        
        {/* Dekorasi Blob Oranye Bawah */}
        <div className="decor-blob-bottom"></div>
        
        {/* Gambar Utama Brownies */}
        <div className="main-brownie-img">
          <span className="placeholder-text">Gambar Tumpukan Brownies</span>
        </div>
      </div>

      {/* Bagian Kanan: Teks & Tombol */}
      <div className="landing-content">
        
        {/* Logo di Kanan Atas */}
        <div className="logo-wrapper">
          {/* Ganti dengan <img src={...} /> logo Shan's Cake nantinya */}
          <div className="logo-placeholder">Logo Shan's Cake</div>
        </div>

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