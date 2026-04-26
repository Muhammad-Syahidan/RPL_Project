import { useState } from 'react';
import './CheckoutPage.css';

export default function CheckoutPage() {
  // State untuk interaktivitas form
  const [nama, setNama] = useState('Windah');
  const [alamat, setAlamat] = useState('Jl. Mahakam No. 45, RT 012/RW 003, Kelurahan Pelabuhan, Kecamatan Samarinda Kota, Kota Samarinda, Kalimantan Timur, 75112.');
  
  // State untuk Topping (Bisa pilih lebih dari satu)
  const [toppings, setToppings] = useState({
    oreo: true,
    chocoChips: false,
    doubleChoco: true,
    request: false,
  });

  // State untuk Pengiriman & Pembayaran (Hanya bisa pilih satu)
  const [pengiriman, setPengiriman] = useState('ambil');
  const [pembayaran, setPembayaran] = useState('transfer');

  const handleToppingChange = (key: keyof typeof toppings) => {
    setToppings({ ...toppings, [key]: !toppings[key] });
  };

  return (
    <div className="checkout-container">
      {/* Dekorasi Sudut Kanan Atas */}
      <div className="bg-blob"></div>

      <div className="checkout-content">
        {/* Tombol Kembali */}
        <button className="back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        {/* Ringkasan Produk */}
        <div className="product-summary">
          <div className="product-img-box">
            {/* Ganti div ini dengan <img> jika aset sudah ada */}
            <span className="img-placeholder">Gambar Brownies</span>
          </div>
          <div className="product-details">
            <h1 className="product-title">Fudgy Brownies Box - XL<br/>(20x20)</h1>
            <span className="product-qty">x1</span>
            <p className="product-price">Rp 82.000</p>
          </div>
        </div>

        {/* Form Checkout */}
        <div className="checkout-form">
          
          {/* Nama Pemesan */}
          <div className="form-group">
            <label>Nama Pemesan :</label>
            <input 
              type="text" 
              className="input-box" 
              value={nama} 
              onChange={(e) => setNama(e.target.value)} 
            />
          </div>

          {/* Add Toppings */}
          <div className="form-group">
            <label>Add Toppings :</label>
            <div className="options-grid">
              <div className="option-pill" onClick={() => handleToppingChange('oreo')}>
                <span>1. Oreo</span>
                <div className="option-right">
                  <span>+2.000</span>
                  <div className="check-box">{toppings.oreo && '✓'}</div>
                </div>
              </div>
              <div className="option-pill" onClick={() => handleToppingChange('doubleChoco')}>
                <span>3. Double Chocolate</span>
                <div className="option-right">
                  <span>+3.000</span>
                  <div className="check-box">{toppings.doubleChoco && '✓'}</div>
                </div>
              </div>
              <div className="option-pill" onClick={() => handleToppingChange('chocoChips')}>
                <span>2. Choco Chips</span>
                <div className="option-right">
                  <span>+2.000</span>
                  <div className="check-box">{toppings.chocoChips && '✓'}</div>
                </div>
              </div>
              <div className="option-pill" onClick={() => handleToppingChange('request')}>
                <span>4. Request (Menyesuaikan)</span>
                <div className="option-right">
                  <div className="check-box">{toppings.request && '✓'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Alamat */}
          <div className="form-group">
            <label>Alamat :</label>
            <div className="input-box textarea-box">
              <textarea 
                value={alamat} 
                onChange={(e) => setAlamat(e.target.value)}
              />
              <svg className="edit-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </div>
          </div>

          {/* Opsi Pengiriman */}
          <div className="form-group">
            <label>Opsi Pengiriman :</label>
            <div className="options-grid">
              <div className="option-pill" onClick={() => setPengiriman('kurir')}>
                <span>1. Kurir (Menyesuaikan)</span>
                <div className={`radio-box ${pengiriman === 'kurir' ? 'active' : ''}`}></div>
              </div>
              <div className="option-pill" onClick={() => setPengiriman('ambil')}>
                <span>2. Ambil Sendiri</span>
                <div className="option-right">
                  <span>Rp 0</span>
                  <div className={`radio-box ${pengiriman === 'ambil' ? 'active' : ''}`}>
                    {pengiriman === 'ambil' && '✓'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="form-group">
            <label>Metode Pembayaran :</label>
            <div className="options-grid">
              <div className="option-pill" onClick={() => setPembayaran('tunai')}>
                <span>1. Tunai</span>
                <div className={`radio-box ${pembayaran === 'tunai' ? 'active' : ''}`}>
                  {pembayaran === 'tunai' && '✓'}
                </div>
              </div>
              <div className="option-pill" onClick={() => setPembayaran('transfer')}>
                <span>2. Transfer</span>
                <div className={`radio-box ${pembayaran === 'transfer' ? 'active' : ''}`}>
                  {pembayaran === 'transfer' && '✓'}
                </div>
              </div>
            </div>
          </div>

          {/* Tombol Pesan */}
          <div className="submit-section">
            <button className="btn-pesan">Pesan</button>
          </div>

        </div>
      </div>
    </div>
  );
}