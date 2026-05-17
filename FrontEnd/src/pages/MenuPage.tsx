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
  const [menus, setMenus] = useState<MenuData[]>([]);
  
  // 1. STATE BARU: Menyimpan kategori yang sedang dipilih (Default: 'Semua')
  const [activeCategory, setActiveCategory] = useState('Semua');

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menus');
        setMenus(response.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    fetchMenus();
  }, []);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  // 2. LOGIKA FILTER: Menyaring data berdasarkan kata kunci pada nama kue
  const filteredMenus = activeCategory === 'Semua' 
    ? menus 
    : menus.filter(menu => menu.name.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="menu-container">
      <div className="bg-pattern"></div>
      
      <div className="menu-content">
        <h1 className="menu-title">Shan's Menu</h1>

        {/* 3. TOMBOL KATEGORI YANG SUDAH HIDUP */}
        <div className="category-filter">
          {['Semua', 'Brownies', 'Cake', 'Churros', 'Cookies'].map((kategori) => (
            <button 
              key={kategori}
              // Menambahkan efek visual jika tombol sedang aktif
              className={`category-btn ${activeCategory === kategori ? 'active' : ''}`} 
              // Mengubah state saat diklik
              onClick={() => setActiveCategory(kategori)}
              style={{
                backgroundColor: activeCategory === kategori ? '#5c3a21' : 'transparent',
                color: activeCategory === kategori ? 'white' : '#5c3a21'
              }}
            >
              {kategori === 'Semua' ? 'Semua Menu' : kategori}
            </button>
          ))}
        </div>

        {/* Grid Produk */}
        <div className="product-grid">
          {/* 4. MENGGUNAKAN filteredMenus BUKAN menus */}
          {filteredMenus.length > 0 ? (
            filteredMenus.map((item) => (
              <div className="product-card" key={item.id}>
                
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="product-image-placeholder" style={{ objectFit: 'cover', padding: 0, border: 'none' }} />
                ) : (
                  <div className="product-image-placeholder"><span>Gambar {item.name}</span></div>
                )}
                
                <div className="product-info">
                  <div className="text-info">
                    <span className="product-name">{item.name}</span>
                    <span className="product-price">{formatRupiah(item.price)}</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="add-btn" style={{ backgroundColor: '#e87b37', color: 'white', border: 'none' }} onClick={() => navigate('/edit-menu', { state: { produk: item } })} title="Edit Menu">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button className="add-btn" onClick={() => navigate('/checkout', { state: { produk: item } })} title="Pesan Menu">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%', color: '#5c3a21', marginTop: '20px' }}>
              Tidak ada menu di kategori ini.
            </p>
          )}
        </div>

        {/* Tombol Aksi Bawah tetap di sini... */}
        <div className="bottom-actions">
          <button className="action-btn" onClick={() => navigate('/')}><span>&#8592;</span> Kembali</button>
          <button className="action-btn whatsapp-btn">WhatsApp</button>
        </div>
      </div>
    </div>
  );
}