import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CheckoutPage.css';
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
  
  const keranjang = location.state?.infoKeranjang || [];
  const totalHargaDasar = location.state?.totalHarga || 0;

  const hasBrownies = keranjang.some((item: any) => {
    const nama = item.nama_varian.toLowerCase();
    return nama.includes('fudgy brownies') && nama.includes('box');
  });

  const [selectedToppings, setSelectedToppings] = useState<number[]>([]);
  const [pengiriman, setPengiriman] = useState('Ambil Sendiri');
  const [pembayaran, setPembayaran] = useState('Transfer');
  const [nama, setNama] = useState('');
  const [noHp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState(() => localStorage.getItem('shans_user_address') || '');

  const totalToppingHarga = selectedToppings.reduce((acc, id) => {
    const topping = TOPPING_OPTIONS.find((t) => t.id === id);
    return acc + (topping?.harga || 0);
  }, 0);

  const finalTotalHarga = totalHargaDasar + totalToppingHarga;

  const handleAlamatChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setAlamat(value);
    localStorage.setItem('shans_user_address', value);
  };

  const handlePesan = async () => {
    if (!nama.trim() || !noHp.trim()) {
      alert("Mohon isi Nama dan Nomor WhatsApp Anda.");
      return;
    }
    if (pengiriman === 'Kurir' && !alamat.trim()) {
      alert("Karena Anda memilih Kurir, mohon isi Alamat lengkap.");
      return;
    }

    const order_id = "ORD-" + Date.now();
    
    // Perbaikan: Memformat items agar sesuai dengan kebutuhan database
    const formattedItems = keranjang.map((item: any) => ({
      id_produk: item.id_produk,
      jumlah: item.quantity,
      subtotal: item.harga * item.quantity
    }));

    const orderData = {
      order_id,
      nama,
      noHp,
      pengiriman,
      pembayaran,
      totalHarga: finalTotalHarga,
      alamat: pengiriman === 'Kurir' ? alamat : 'Ambil Sendiri',
      items: formattedItems 
    };

    try {
      const response = await fetch('http://localhost:5000/api/transaksi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        localStorage.setItem('user_order_id', order_id);
        if (pembayaran === 'Transfer') {
          navigate('/payment', { state: { orderData } });
        } else {
          navigate('/confirmation', { state: { orderData } });
        }
      } else {
        alert("Gagal memproses pesanan. Silakan coba lagi.");
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi ke server.");
    }
  };

  if (keranjang.length === 0) return <div style={{ padding: 50 }}>Keranjang kosong. <button onClick={() => navigate('/menu')}>Kembali ke Menu</button></div>;

  return (
    <div className="checkout-container">
      <div className="bg-blob"></div>
      <div className="checkout-content">
        <div className="top-section">
          <button className="back-btn-floated" onClick={() => navigate(-1)}>
            <img src={backArrow} alt="Back" className="back-arrow-icon" />
          </button>
          
          <div className="product-info-wrapper">
            {keranjang.map((item: any, index: number) => (
              <div key={index} style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
                <div className="product-img-box">
                  {item.foto && <img src={`http://localhost:5000/uploads/${encodeURIComponent(item.foto)}`} alt={item.nama_varian} />}
                </div>
                <div className="product-text-details" style={{ marginLeft: '15px' }}>
                  <div className="product-text-header">
                    <h1 className="product-title">{item.nama_varian}</h1>
                    <span className="product-qty">x{item.quantity}</span>
                  </div>
                  <p className="product-price">Rp {(item.harga * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
            
            <div style={{ fontWeight: '500', marginBottom: '20px', color: '#643F2D' }}>
              Total Produk : Rp {finalTotalHarga.toLocaleString()}
            </div>

            <label>Nama Pemesan :</label>
            <input className="input-nama-box" placeholder="Masukkan nama Anda" value={nama} onChange={(e) => setNama(e.target.value)} />
            
            <label style={{ marginTop: '15px', display: 'block' }}>Nomor WhatsApp :</label>
            <input className="input-nama-box" placeholder="Masukkan nomor WA" value={noHp} onChange={(e) => setNoHp(e.target.value)} />
          </div>
        </div>

        <div className="checkout-form">
          {hasBrownies && (
            <>
              <label>Tambah Topping untuk Fudgy Brownies Box Anda :</label>
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
            </>
          )}

          <label>Alamat :</label>
          <div className="alamat-container">
            <textarea className="alamat-textarea" value={alamat} onChange={handleAlamatChange} placeholder="Masukkan alamat lengkap pengiriman..." rows={3} />
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