import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CheckoutPage.css';
import editIcon from '../assets/edit.png';
import backArrow from '../assets/arrow_back.png';

const TOPPING_OPTIONS = [
  { id: 1, label: 'Oreo', harga: 2000 },
  { id: 2, label: 'Choco Chips', harga: 2000 },
  { id: 3, label: 'Double Chocolate', harga: 3000 },
  { id: 4, label: 'Request', harga: 0 },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.produk;

  const [selectedToppings, setSelectedToppings] = useState<number[]>([]);
  const [pengiriman, setPengiriman] = useState('Ambil Sendiri');
  const [pembayaran, setPembayaran] = useState('Transfer');

  const alamat = 'Jl. Mahakam No. 45, RT 012/RW 003, Kelurahan Pelabuhan, Kecamatan Samarinda Kota, Kota Samarinda, Kalimantan Timur, 75112.';

  const handlePesan = () => {
    const orderData = {
      produk: item,
      toppingTerpilih: selectedToppings.map((id) => TOPPING_OPTIONS.find((t) => t.id === id)),
      pengiriman,
      pembayaran,
    };
    navigate('/payment', { state: { orderData } });
  };

  if (!item) return <div style={{ padding: 50 }}>Produk tidak ditemukan.</div>;

  return (
    <div className="checkout-container">
      <div className="bg-blob"></div>
      <div className="checkout-content">
        <div className="top-section">
          <button className="back-btn-floated" onClick={() => navigate(-1)}>
            <img src={backArrow} alt="Back" className="back-arrow-icon" />
          </button>
          <div className="product-info-wrapper">
            <div className="product-img-box">
              {item.foto && <img src={`http://localhost:5000/images/${item.foto}`} alt={item.nama_varian} />}
            </div>
            <div className="product-text-details">
              <div className="product-text-header">
                <h1 className="product-title">{item.nama_varian}</h1>
                <span className="product-qty">x{item.jumlah || 1}</span>
              </div>
              <p className="product-price">Rp {item.harga.toLocaleString()}</p>
              <label>Nama Pemesan:</label>
              <input className="input-nama-box" placeholder="Windah" />
            </div>
          </div>
        </div>

        <div className="checkout-form">
          <label>Add Toppings :</label>
          <div className="options-grid">
            {TOPPING_OPTIONS.map((t) => (
              <div key={t.id} className="option-pill" onClick={() => setSelectedToppings((prev) => prev.includes(t.id) ? prev.filter((i) => i !== t.id) : [...prev, t.id])}>
                <span className="pill-content">
                  <span>{t.id}. {t.label}</span>
                  <span className="price-label">{t.harga > 0 ? `+${t.harga.toLocaleString()}` : '(Menyesuaikan)'}</span>
                </span>
                <div className={`radio-box ${selectedToppings.includes(t.id) ? 'active' : ''}`}>
                  {selectedToppings.includes(t.id) && '✓'}
                </div>
              </div>
            ))}
          </div>

          <label>Alamat :</label>
          <div className="alamat-container">
            <span style={{ fontSize: '14px', lineHeight: '1.4' }}>{alamat}</span>
            <img src={editIcon} alt="Edit" className="edit-icon" />
          </div>

          <label>Opsi Pengiriman :</label>
          <div className="options-grid">
            {[
              { label: 'Kurir', sub: '(Menyesuaikan)' },
              { label: 'Ambil Sendiri', sub: 'Rp 0' },
            ].map((opt) => (
              <div key={opt.label} className="option-pill" onClick={() => setPengiriman(opt.label)}>
                <span>{opt.label}</span>
                <span className="price-label">{opt.sub}</span>
                <div className={`radio-box ${pengiriman === opt.label ? 'active' : ''}`}>
                  {pengiriman === opt.label && '✓'}
                </div>
              </div>
            ))}
          </div>

          <label>Metode Pembayaran :</label>
          <div className="options-grid">
            {['Tunai', 'Transfer'].map((opt) => (
              <div key={opt} className="option-pill" onClick={() => setPembayaran(opt)}>
                <span>{opt}</span>
                <div className={`radio-box ${pembayaran === opt ? 'active' : ''}`}>
                  {pembayaran === opt && '✓'}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '20px' }}>
            <button className="btn-pesan" onClick={handlePesan}>Pesan</button>
          </div>
        </div>
      </div>
    </div>
  );
}