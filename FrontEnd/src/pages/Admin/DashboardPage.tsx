import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DashboardPage.css';
import cookieDecoration from '../../assets/Cookie Decoration.png';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [jumlahPesananBaru, setJumlahPesananBaru] = useState(0);

  // Fungsi untuk cek pesanan masuk
  const checkNewOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transaksi/all');
      // Filter pesanan dengan status 'Diterima'
      const pesananBaru = response.data.filter((item: any) => item.status === 'Diterima');
      setJumlahPesananBaru(pesananBaru.length);
    } catch (error) {
      console.error("Gagal cek pesanan baru:", error);
    }
  };

  useEffect(() => {
    // Cek pertama kali saat load
    checkNewOrders();

    // Cek setiap 10 detik
    const interval = setInterval(() => {
      checkNewOrders();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
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
        <h1 className="admin-dashboard-title">Shan&apos;s Dashboard</h1>

        <div className="admin-dashboard-menu-list">
          <button className="admin-dashboard-menu-btn" onClick={() => navigate('/admin/menu')}>
            Menu
          </button>
          
          {/* Tombol Status Pemesanan dengan Badge Notifikasi */}
          <button 
            className="admin-dashboard-menu-btn" 
            onClick={() => navigate('/admin/order-status')}
            style={{ position: 'relative' }}
          >
            Status Pemesanan
            {jumlahPesananBaru > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 8px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {jumlahPesananBaru}
              </span>
            )}
          </button>

          <button className="admin-dashboard-menu-btn" onClick={() => navigate('/admin/report')}>
            Laporan
          </button>
        </div>

        <button className="admin-dashboard-btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}