import './DashboardPage.css';

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      {/* Latar Belakang Pola (Pattern) */}
      <div className="bg-pattern-full"></div>

      {/* Dekorasi Cookie Kanan Bawah */}
      {/* Nanti ganti dengan tag <img src={...} /> jika gambar sudah dipotong */}
      <div className="decor-cookie-bottom">
        <span className="placeholder-text">Gambar Cookie</span>
      </div>

      <div className="dashboard-content">
        {/* Judul Dashboard */}
        <h1 className="dashboard-title">shan's Dashboard</h1>

        {/* Kumpulan Tombol Navigasi Utama */}
        <div className="dashboard-menu-list">
          <button className="menu-btn">Menu</button>
          <button className="menu-btn">Status Pemesanan</button>
          <button className="menu-btn">Laporan</button>
        </div>

        {/* Tombol Logout */}
        <div className="logout-section">
          <button className="btn-logout">Logout</button>
        </div>
      </div>
    </div>
  );
}