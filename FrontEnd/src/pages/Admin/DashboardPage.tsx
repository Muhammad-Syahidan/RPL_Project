import './DashboardPage.css';
import { useNavigate } from 'react-router-dom';
import cookieDecoration from '../../assets/Cookie Decoration.png';

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Tambahkan logika hapus token/session di sini jika ada
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-bg-pattern"></div>

      <img
        src={cookieDecoration}
        alt="Cookie Decoration"
        className="admin-dashboard-cookie"
      />

      <div className="admin-dashboard-content">
        <h1 className="admin-dashboard-title">
          Shan&apos;s Dashboard
        </h1>

        <div className="admin-dashboard-menu-list">
          {/* Tombol Menu */}
          <button 
            className="admin-dashboard-menu-btn" 
            onClick={() => navigate('/admin/menu')}
          >
            Menu
          </button>

          {/* Tombol Status Pemesanan */}
          <button 
            className="admin-dashboard-menu-btn" 
            onClick={() => navigate('/admin/order-status')}
          >
            Status Pemesanan
          </button>

          {/* Tombol Laporan */}
          <button 
            className="admin-dashboard-menu-btn"
            onClick={() => navigate('/admin/report')}
          >
            Laporan
          </button>
        </div>

      </div>
    </div>
  );
}