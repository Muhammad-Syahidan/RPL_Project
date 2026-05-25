import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css';

import browniesLapisImg from '../../assets/browniesLapis.png'; 
import orangeCircleImg from '../../assets/background_bulat.png';
import logoImg from '../../assets/logo.png'; 

export default function AdminLoginPage() {
  const navigate = useNavigate();

  return (
    <div className="admin-login-container">
      {/* Sisi Kiri */}
      <div className="admin-login-visual" />

      {/* Sisi Kanan */}
      <div className="admin-login-form-section">
        
        {/* Header (Logo & Teks) */}
        <div className="admin-login-header-absolute">
          <h1 className="admin-login-title">Halo, Shan!</h1>
          <img src={logoImg} alt="Logo" className="admin-login-logo-img" />
        </div>
        
        {/* Tombol Login */}
        <button onClick={() => navigate('/admin/dashboard')} className="admin-login-btn-submit">
          Login
        </button>

        {/* Dekorasi */}
        <img src={orangeCircleImg} alt="Circle" className="admin-orange-circle-decoration" />
        <img src={browniesLapisImg} alt="Brownies" className="admin-decor-brownies-lapis" />
      </div>
    </div>
  );
}