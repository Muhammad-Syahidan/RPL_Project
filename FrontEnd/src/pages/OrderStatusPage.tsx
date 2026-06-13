import { useState, useEffect } from 'react';
import './OrderStatusPage.css'; // Sesuaikan file CSS-nya
import { useNavigate } from 'react-router-dom';

export default function OrderStatusPage() {
  const [order, setOrder] = useState<any>(null);
  const [kodeInput, setKodeInput] = useState('');
  const [waInput, setWaInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Cek otomatis jika ada ID di browser (localStorage)
  useEffect(() => {
    const savedKode = localStorage.getItem('user_order_id');
    if (savedKode) {
      handleCheckStatus(savedKode, ''); 
    }
  }, []);

  // 2. Fungsi untuk mengambil data dari Database
  const handleCheckStatus = async (kode: string, wa: string) => {
    setLoading(true);
    // GANTI URL DI BAWAH dengan API backend kamu
    // Contoh: await axios.get(`http://localhost:5000/api/cek-status?kode=${kode}&wa=${wa}`)
    
    // Simulasi respons dari Database:
    setTimeout(() => {
      setOrder({
        kode_pesanan: kode,
        status: 'Proses', // Ini data yang diambil dari DB
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="status-container">
      <h1 className="status-title">Lacak Pesanan</h1>

      {order ? (
        // --- TAMPILAN JIKA PESANAN DITEMUKAN ---
        <div className="status-result">
          <div className="result-card">
            <p>ID Pesanan: <strong>{order.kode_pesanan}</strong></p>
            <p>Status: <span className="status-badge">{order.status}</span></p>
          </div>
          <button className="btn-back" onClick={() => navigate('/')}>Kembali ke Menu</button>
        </div>
      ) : (
        // --- TAMPILAN JIKA HARUS INPUT MANUAL ---
        <div className="status-form">
          <p>Masukkan kode pesanan untuk melacak:</p>
          <input 
            placeholder="Contoh: SHN-12345" 
            onChange={(e) => setKodeInput(e.target.value)} 
          />
          <input 
            placeholder="Nomor WhatsApp" 
            onChange={(e) => setWaInput(e.target.value)} 
          />
          <button 
            onClick={() => handleCheckStatus(kodeInput, waInput)}
            disabled={loading}
          >
            {loading ? 'Mencari...' : 'Lacak Pesanan'}
          </button>
        </div>
      )}
    </div>
  );
}