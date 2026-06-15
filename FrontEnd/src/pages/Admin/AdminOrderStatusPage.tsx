import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminOrderStatusPage.css';
import cookieDecorationImg from '../../assets/Cookie Decoration.png'; 
import arrowBackIcon from '../../assets/arrow_back.png';

export default function AdminOrderStatusPage() {
  const [transaksiList, setTransaksiList] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  // Tambahkan state filter
  const [filterStatus, setFilterStatus] = useState('Semua'); 
  const navigate = useNavigate();

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transaksi/all');
      setTransaksiList(response.data);
    } catch (error) {
      console.error("Gagal memuat data:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleUpdateStatus = async (kode_pesanan: string, newStatus: string) => {
    try {
      await axios.put(`http://localhost:5000/api/transaksi/update-status/${kode_pesanan}`, { 
        status: newStatus 
      });
      alert("Status berhasil diperbarui!");
      fetchAllOrders();
    } catch (error) {
      alert("Gagal memperbarui status.");
    }
  };

  // Logika Filter Data
  const filteredData = filterStatus === 'Semua' 
    ? transaksiList 
    : transaksiList.filter(item => item.status === filterStatus);

  return (
    <div className="admin-pemesanan-container">
      <div className="admin-pemesanan-bg-pattern"></div>
      <img src={cookieDecorationImg} alt="Decoration" className="admin-pemesanan-cookie-decoration" />
      
      <div className="admin-pemesanan-content">
        <h1 className="admin-pemesanan-title">Status Pemesanan</h1>

        {/* Dropdown Filter */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-select"
            style={{ width: '500px'}}
          >
            <option value="Semua">Semua Status</option>
            <option value="Proses">Proses</option>
            <option value="Diterima">Diterima</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>

        <div className="admin-pemesanan-table-wrapper">
          <table className="admin-pemesanan-table">
            <thead>
              <tr className="table-header">
                <th>No.</th>
                <th>ID Transaksi</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(0, visibleCount).map((order, index) => (
                <tr key={order.id_transaksi}>
                  <td>{index + 1}</td>
                  <td>{order.kode_pesanan}</td>
                  <td>
                    <select 
                      value={order.status} 
                      onChange={(e) => handleUpdateStatus(order.kode_pesanan, e.target.value)}
                      className="status-select"
                    >
                      <option value="Proses">Proses</option>
                      <option value="Diterima">Diterima</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </td>
                </tr>
              ))}
              
              {(visibleCount < filteredData.length || visibleCount > 10) && (
                <tr>
                  <td colSpan={3} className="table-footer-controls">
                    {visibleCount < filteredData.length && (
                      <button className="btn-control" onClick={() => setVisibleCount(prev => prev + 10)}>
                        Tampilkan Lebih Banyak
                      </button>
                    )}
                    {visibleCount > 10 && (
                      <button className="btn-control" onClick={() => setVisibleCount(10)}>
                        Tampilkan Lebih Sedikit
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-pemesanan-back-wrapper">
          <button className="admin-pemesanan-btn-back" onClick={() => navigate('/admin/dashboard')}>
            <img src={arrowBackIcon} alt="Back" className="btn-back-icon" />
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}