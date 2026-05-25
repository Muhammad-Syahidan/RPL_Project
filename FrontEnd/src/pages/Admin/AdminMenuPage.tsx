import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminMenuPage.css';
import arrowBack from '../../assets/arrow_back.png';
import cookieDecorationImg from '../../assets/Cookie Decoration.png';
import editIconImg from '../../assets/edit2.png';

interface MenuData {
  id_produk: number;
  nama_varian: string;
  harga: number;
  foto: string | null;
}

export default function AdminMenuPage() {
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
    <div className="admin-menu-container">
      <div className="admin-menu-bg-pattern"></div>
      <img src={cookieDecorationImg} alt="Decoration" className="admin-menu-cookie-decoration" />
      
      <div className="admin-menu-content">
        <h1 className="admin-menu-title">Shan's Menu</h1>

        <div className="admin-menu-category-filter">
          <button className="admin-menu-category-btn">Fudgy Brownies</button>
          <button className="admin-menu-category-btn">Mini Cake</button>
          <button className="admin-menu-category-btn">Churros</button>
          <button className="admin-menu-category-btn">Cookies</button>
        </div>

        <div className="admin-menu-product-grid">
          {menus.map((item) => (
            <div className="admin-menu-product-card" key={item.id_produk}>
              {item.foto ? (
                <img src={`http://localhost:5000/images/${item.foto}`} alt={item.nama_varian} className="admin-menu-product-image" />
              ) : (
                <div className="admin-menu-product-image-placeholder"><span>{item.nama_varian}</span></div>
              )}
              
              <div className="admin-menu-product-info">
                <div className="admin-menu-text-info">
                  <span className="admin-menu-product-name">{item.nama_varian}</span>
                  <span className="admin-menu-product-price">{formatRupiah(item.harga)}</span>
                </div>
                <button className="admin-menu-edit-btn" onClick={() => navigate(`/admin/edit-menu/${item.id_produk}`)}>
                  <img src={editIconImg} alt="Edit" className="admin-menu-edit-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-menu-bottom-actions">
          <button className="admin-menu-action-btn" onClick={() => navigate('/admin/dashboard')}>
            <img src={arrowBack} alt="Back" className="admin-menu-back-icon" /> Kembali
          </button>
          <button className="admin-menu-action-btn" onClick={() => navigate('/admin/tambah-menu')}>
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}