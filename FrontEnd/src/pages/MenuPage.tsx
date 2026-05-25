import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MenuPage.css';
import cookieDecorationImg from '../assets/Cookie Decoration.png';
import arrowBack from '../assets/arrow_back.png';

interface MenuData {
  id_produk: number;
  nama_varian: string;
  harga: number;
  foto: string | null;
}

export default function MenuPage() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<MenuData[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menus');
        setMenus(response.data);
      } catch (error) {
        console.error('Gagal mengambil data menu:', error);
      }
    };
    fetchMenus();
  }, []);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', maximumFractionDigits: 0
    }).format(angka || 0);
  };

  return (
    <div className="menu-container">
      <div className="menu-bg-pattern"></div>
      <img src={cookieDecorationImg} alt="Cookie Decoration" className="cookie-decoration" />
      <div className="menu-content">
        <h1 className="menu-title">Shan's Menu</h1>
        <div className="category-filter">
          <button className="category-btn">Fudgy Brownies</button>
          <button className="category-btn">Mini Cake</button>
          <button className="category-btn">Churros</button>
          <button className="category-btn">Cookies</button>
        </div>
        <div className="product-grid">
          {menus.length > 0 ? (
            menus.map((item) => (
              <div className="product-card" key={item.id_produk}>
                {item.foto ? (
                  <img src={`http://localhost:5000/images/${item.foto}`} alt={item.nama_varian} className="product-image" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/260x260?text=Gambar+Tidak+Ada'; }} />
                ) : (
                  <div className="product-image-placeholder"><span>{item.nama_varian}</span></div>
                )}
                <div className="product-info">
                  <div className="text-info">
                    <span className="product-name">{item.nama_varian}</span>
                    <span className="product-price">{formatRupiah(item.harga)}</span>
                  </div>
                  <button className="add-btn" onClick={() => navigate('/checkout', { state: { produk: item } })}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#5c3a21', marginTop: '20px', fontWeight: 600 }}>Memuat menu...</p>
          )}
        </div>
        <div className="bottom-actions">
          <button className="action-btn back-btn" onClick={() => navigate('/home')}>
            <img src={arrowBack} alt="Back" className="back-icon" /> Kembali
          </button>
          <button className="action-btn whatsapp-btn">WhatsApp</button>
        </div>
      </div>
    </div>
  );
}