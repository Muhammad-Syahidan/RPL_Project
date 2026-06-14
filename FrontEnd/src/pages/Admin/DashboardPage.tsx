import './DashboardPage.css';
import { useNavigate } from 'react-router-dom';
import cookieDecoration from '../../assets/Cookie Decoration.png';

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
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
          <button className="admin-dashboard-menu-btn" onClick={() => navigate('/admin/menu')}>
            Menu
          </button>
          <button className="admin-dashboard-menu-btn" onClick={() => navigate('/admin/order-status')}>
            Status Pemesanan
          </button>
          <button className="admin-dashboard-menu-btn" onClick={() => navigate('/admin/report')}>
            Laporan
          </button>
        </div>

        {/* Tombol Logout (Lebih kecil) */}
        <button className="admin-dashboard-btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}