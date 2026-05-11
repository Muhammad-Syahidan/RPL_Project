import { useState, useEffect } from 'react'; // Tambahkan useState dan useEffect
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios untuk pemanggilan API
import './MenuPage.css';

// Mendefinisikan kerangka data sesuai dengan kolom di tabel MySQL kita
interface MenuData {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

export default function MenuPage() {
  const navigate = useNavigate();
  
  // State untuk menyimpan data menu dari database
  const [menus, setMenus] = useState<MenuData[]>([]);

  // Fungsi untuk mengambil data dari backend saat halaman dibuka
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menus');
        setMenus(response.data); // Memasukkan data dari database ke state
      } catch (error) {
        console.error("Gagal mengambil data menu dari server:", error);
      }
    };

    fetchMenus();
  }, []);

  // Fungsi otomatis untuk mengubah angka (misal: 35000) menjadi format (Rp 35.000)
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      maximumFractionDigits: 0 
    }).format(angka);
  };

  return (
    <div className="menu-container">
      <div className="bg-pattern"></div>
      
      <div className="menu-content">
        <h1 className="menu-title">Shan's Menu</h1>

        {/* Filter Kategori (Saat ini masih statis secara visual) */}
        <div className="category-filter">
          <button className="category-btn">Fudgy Brownies</button>
          <button className="category-btn">Mini Cake</button>
          <button className="category-btn">Churros</button>
          <button className="category-btn">Cookies</button>
        </div>

        {/* Grid Produk */}
        <div className="product-grid">
          {menus.length > 0 ? (
            menus.map((item) => (
              <div className="product-card" key={item.id}>
                
                {/* Logika Menampilkan Gambar Asli atau Placeholder */}
                {item.image_url ? (
                  <img 
                    src={item.image_url} 
                    alt={item.name} 
                    className="product-image-placeholder" // Tetap memakai class ini agar ukurannya konsisten
                    style={{ objectFit: 'cover', padding: 0, border: 'none' }} // Penyesuaian agar gambar pas di kotak
                  />
                ) : (
                  <div className="product-image-placeholder">
                    <span>Gambar {item.name}</span>
                  </div>
                )}
                
                <div className="product-info">
                  <div className="text-info">
                    <span className="product-name">{item.name}</span>
                    {/* Memanggil formatRupiah untuk harga dari database */}
                    <span className="product-price">{formatRupiah(item.price)}</span>
                  </div>
                  <button className="add-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%', color: '#5c3a21', marginTop: '20px' }}>
              Memuat menu... atau katalog sedang kosong.
            </p>
          )}
        </div>

        {/* Tombol Aksi Bawah */}
        <div className="bottom-actions">
          <button className="action-btn" onClick={() => navigate('/')}>
            <span>&#8592;</span> Kembali
          </button>
          <button className="action-btn whatsapp-btn">
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}