import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfirmationPage.css';

// Import aset dekorasi
import chocoDrip from '../assets/ChocoDrip.png';
import cookieDecoration from '../assets/Cookie Decoration.png';

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Mengambil ID pesanan yang disimpan dari proses Checkout/Payment sebelumnya
    const savedOrderId = localStorage.getItem('user_order_id');
    setOrderId(savedOrderId);
  }, []);

  const handleCheckOrder = () => {
    // Pastikan path ini SAMA dengan yang ada di App.tsx (misal: <Route path="/check-order" ... />)
    navigate('/check-order'); 
  };

  return (
    <div className="confirmation-container">
      {/* Dekorasi Background */}
      <img src={chocoDrip} alt="Choco Drip" className="decor-choco-drip" />
      <img src={cookieDecoration} alt="Cookie Decoration" className="decor-cookie" />

      <div className="confirmation-content">
        <h1 className="title-thanks">Terima Kasih Brownie!</h1>
        <h2 className="subtitle-process">Pesanan Kamu Akan Segera Diproses</h2>

        {/* Kotak Nomor Pesanan */}
        {orderId ? (
          <div className="order-display-box">
            <p className="order-label">Nomor Pesanan Anda:</p>
            <h3 className="order-id-text">{orderId}</h3>
          </div>
        ) : (
          <p>ID Pesanan tidak ditemukan.</p>
        )}

        {/* Peringatan Wajib Screenshot */}
        <div className="screenshot-alert">
          <p>
            📸 <b>WAJIB SCREENSHOT!</b> <br/>
            Simpan ID ini agar Anda bisa melacak status pesanan Anda kapan saja.
          </p>
        </div>

        {/* Tombol Navigasi */}
        <button
          className="btn-cek-pesanan"
          onClick={handleCheckOrder}
        >
          Cek Pesanan Saya
        </button>
      </div>
    </div>
  );
}