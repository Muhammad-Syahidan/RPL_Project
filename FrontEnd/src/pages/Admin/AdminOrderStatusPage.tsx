import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminOrderStatusPage.css';
import cookieDecorationImg from '../../assets/Cookie Decoration.png'; 
import arrowBackIcon from '../../assets/arrow_back.png';

export default function AdminOrderStatusPage() {
  const [transaksiList, setTransaksiList] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState('Semua'); 
  const [selectedOrder, setSelectedOrder] = useState<any>(null); 
  // Kembali menggunakan visibleCount dengan nilai awal 10
  const [visibleCount, setVisibleCount] = useState(10); 
  const [fullImage, setFullImage] = useState<string | null>(null); // State baru untuk gambar penuh
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
    const interval = setInterval(fetchAllOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  // Reset count ke 10 setiap kali filter berubah agar rapi
  useEffect(() => {
    setVisibleCount(10);
  }, [filterStatus]);

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

  const filteredData = filterStatus === 'Semua' 
    ? transaksiList 
    : transaksiList.filter(item => item.status === filterStatus);

  return (
    <div className="admin-pemesanan-container">
      <div className="admin-pemesanan-bg-pattern"></div>
      <img src={cookieDecorationImg} alt="Decoration" className="admin-pemesanan-cookie-decoration" />
      
      <div className="admin-pemesanan-content">
        <h1 className="admin-pemesanan-title">Status Pemesanan</h1>

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
                  <td 
                    onClick={() => setSelectedOrder(order)}
                    style={{ cursor: 'pointer', color: '#8B4513', textDecoration: 'underline', fontWeight: 'bold' }}
                  >
                    {order.kode_pesanan}
                  </td>
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
            </tbody>
          </table>

          {/* Tombol Tampilkan Lebih Banyak */}
          {visibleCount < filteredData.length && (
            <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}>
              <button 
                className="btn-tampilkan-lebih"
                onClick={() => setVisibleCount(prev => prev + 10)}
              >
                Tampilkan Lebih Banyak
              </button>
            </div>
          )}
        </div>

        {/* Modal Pop-up */}
        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <h2 className="modal-title">Detail Pesanan</h2>
              <div className="modal-content-text">
                <p><strong>Nama Pemesan:</strong> {selectedOrder.nama_pelanggan}</p>
                <p><strong>No. Whatsapp:</strong> {selectedOrder.nomor_whatsapp}</p>
                <p><strong>Metode Pembayaran:</strong> {selectedOrder.metode_pembayaran}</p>
                <p><strong>Alamat:</strong> {selectedOrder.alamat_pengiriman}</p>
                <p><strong>Produk:</strong> {selectedOrder.produk_dipesan || "Detail tidak tersedia"}</p>
                
                {/* Bukti Pembayaran */}
                {selectedOrder.metode_pembayaran === 'Transfer' && (
                  <div style={{ marginTop: '15px', textAlign: 'center' }}>
                    <p><strong>Bukti Pembayaran:</strong></p>
                    {selectedOrder.bukti_pembayaran ? (
                      <img 
                        src={`http://localhost:5000/uploads/${selectedOrder.bukti_pembayaran}`} 
                        alt="Bukti Pembayaran" 
                        style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px', borderRadius: '8px', cursor: 'pointer' }} 
                        onClick={() => setFullImage(`http://localhost:5000/uploads/${selectedOrder.bukti_pembayaran}`)}
                      />
                    ) : (
                      <p style={{ fontStyle: 'italic', fontSize: '0.9em' }}>Belum ada bukti pembayaran.</p>
                    )}
                  </div>
                )}
              </div>
              <button className="btn-close" onClick={() => setSelectedOrder(null)}>Tutup</button>
            </div>
          </div>
        )}

        {/* Modal Full Screen Image */}
        {fullImage && (
          <div 
            className="modal-overlay" 
            style={{ zIndex: 2000 }} // Agar muncul di atas modal detail
            onClick={() => setFullImage(null)}
          >
            <div style={{ padding: '20px' }} onClick={e => e.stopPropagation()}>
              <img 
                src={fullImage} 
                alt="Full View" 
                style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '10px', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }} 
              />
            </div>
          </div>
        )}

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