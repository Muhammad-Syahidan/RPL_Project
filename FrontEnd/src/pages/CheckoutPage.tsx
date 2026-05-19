import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Tambahkan useLocation
import './CheckoutPage.css';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation(); // Mengambil data yang dibawa dari halaman Menu

  // Menangkap data produk. Jika tidak ada (misal langsung buka link checkout), beri data default.
  const produkTerpilih = location.state?.produk || {
    name: 'Kue Belum Dipilih',
    price: 0,
    image_url: ''
  };

  const [nama, setNama] = useState('Windah');
  const [alamat, setAlamat] = useState('Jl. Mahakam No. 45, RT 012/RW 003, Kelurahan Pelabuhan, Kecamatan Samarinda Kota, Kota Samarinda, Kalimantan Timur, 75112.');
  
  const [toppings, setToppings] = useState({
    oreo: true,
    chocoChips: false,
    doubleChoco: true,
    request: false,
  });

  const [pengiriman, setPengiriman] = useState('ambil');
  const [pembayaran, setPembayaran] = useState('transfer');

  const handleToppingChange = (key: keyof typeof toppings) => {
    setToppings({ ...toppings, [key]: !toppings[key] });
  };

  const handlePesan = () => {
    // 1. Hitung Total Harga Menggunakan Harga Asli Produk
    let basePrice = produkTerpilih.price; 
    let selectedToppings = [];

    if (toppings.oreo) { basePrice += 2000; selectedToppings.push('Oreo'); }
    if (toppings.chocoChips) { basePrice += 2000; selectedToppings.push('Choco Chips'); }
    if (toppings.doubleChoco) { basePrice += 3000; selectedToppings.push('Double Chocolate'); }
    if (toppings.request) { selectedToppings.push('Request Khusus'); }

    // 2. Susun Format Pesan
    const textPesan = `Halo Shan's Cake! Saya ingin memesan:

📦 *Detail Pesanan:*
- Produk: ${produkTerpilih.name} (x1)
- Topping: ${selectedToppings.length > 0 ? selectedToppings.join(', ') : 'Original/Tanpa Topping'}
- *Total Harga: Rp ${basePrice.toLocaleString('id-ID')}*

👤 *Data Pemesan:*
- Nama: ${nama}
- Pengiriman: ${pengiriman === 'ambil' ? 'Ambil Sendiri' : 'Kurir'}
- Pembayaran: ${pembayaran === 'transfer' ? 'Transfer Bank' : 'Tunai (COD)'}
- Alamat: ${alamat}

Apakah pesanan saya bisa segera diproses?`;

    // 3. Arahkan ke WhatsApp
    const nomorWA = "6281234567890";
    const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(textPesan)}`;
    window.open(urlWA, '_blank');
  };

  return (
    <div className="checkout-container">
      <div className="bg-blob"></div>

      <div className="checkout-content">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        {/* Ringkasan Produk Dinamis */}
        <div className="product-summary">
          <div className="product-img-box" style={{ overflow: 'hidden', padding: 0 }}>
            {produkTerpilih.image_url ? (
              <img src={produkTerpilih.image_url} alt={produkTerpilih.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span className="img-placeholder">Tanpa Foto</span>
            )}
          </div>
          <div className="product-details">
            {/* Nama dan harga kue otomatis berubah sesuai yang di-klik */}
            <h1 className="product-title" style={{ fontSize: '1.2rem' }}>{produkTerpilih.name}</h1>
            <span className="product-qty">x1</span>
            <p className="product-price">Rp {produkTerpilih.price.toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* Form Checkout (Sisa kode ke bawah tidak ada yang berubah) */}
        <div className="checkout-form">
          <div className="form-group">
            <label>Nama Pemesan :</label>
            <input type="text" className="input-box" value={nama} onChange={(e) => setNama(e.target.value)} />
          </div>

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

          <div className="form-group">
            <label>Alamat :</label>
            <div className="input-box textarea-box">
              <textarea value={alamat} onChange={(e) => setAlamat(e.target.value)} />
            </div>
          </div>

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
                  <div className={`radio-box ${pengiriman === 'ambil' ? 'active' : ''}`}>{pengiriman === 'ambil' && '✓'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Metode Pembayaran :</label>
            <div className="options-grid">
              <div className="option-pill" onClick={() => setPembayaran('tunai')}>
                <span>1. Tunai</span>
                <div className={`radio-box ${pembayaran === 'tunai' ? 'active' : ''}`}>{pembayaran === 'tunai' && '✓'}</div>
              </div>
              <div className="option-pill" onClick={() => setPembayaran('transfer')}>
                <span>2. Transfer</span>
                <div className={`radio-box ${pembayaran === 'transfer' ? 'active' : ''}`}>{pembayaran === 'transfer' && '✓'}</div>
              </div>
            </div>
          </div>

          <div className="submit-section">
            <button className="btn-pesan" onClick={handlePesan}>Pesan</button>
          </div>
        </div>
      </div>
    </div>
  );
}