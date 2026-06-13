import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminMenuPage.css';
import arrowBack from '../../assets/arrow_back.png';
import cookieDecorationImg from '../../assets/Cookie Decoration.png';
import editIconImg from '../../assets/edit2.png';
import deleteIconImg from '../../assets/delete.png'; 

interface MenuData {
  id_produk: number;
  nama_varian: string;
  harga: number;
  foto: string | null;
}

export default function AdminMenuPage() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<MenuData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  
  const categories = ['Semua', 'Fudgy Brownies', 'Mini Cake', 'Churros', 'Cookies'];

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

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
      try {
        await axios.delete(`http://localhost:5000/api/menus/${id}`);
        setMenus(menus.filter(menu => menu.id_produk !== id));
      } catch (error) {
        console.error("Gagal menghapus menu:", error);
        alert("Gagal menghapus menu.");
      }
    }
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', maximumFractionDigits: 0
    }).format(angka || 0);
  };

  const filteredMenus = selectedCategory === 'Semua'
    ? menus
    : menus.filter((item) => {
        const namaVarianLcase = item.nama_varian.toLowerCase();
        if (selectedCategory === 'Fudgy Brownies') return namaVarianLcase.includes('brownies');
        if (selectedCategory === 'Mini Cake') return namaVarianLcase.includes('mini cake');
        if (selectedCategory === 'Churros') return namaVarianLcase.includes('churros');
        if (selectedCategory === 'Cookies') return namaVarianLcase.includes('cookies');
        return false;
      });

  return (
    <div className="admin-menu-container">
      <div className="admin-menu-bg-pattern"></div>
      <img src={cookieDecorationImg} alt="Decoration" className="admin-menu-cookie-decoration" />
      
      <div className="admin-menu-content">
        <h1 className="admin-menu-title">Shan's Menu</h1>

        {/* Category Filter */}
        <div className="admin-menu-category-filter">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`admin-menu-category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="admin-menu-product-grid">
          {filteredMenus.map((item) => (
            <div className="admin-menu-product-card" key={item.id_produk}>
              
              {item.foto ? (
                <img 
                  src={`http://localhost:5000/uploads/${encodeURI(item.foto)}`} 
                  alt={item.nama_varian} 
                  className="admin-menu-product-image" 
                  onError={(e) => { 
                    (e.target as HTMLImageElement).src = 'https://placehold.co/260x260?text=Gambar+Rusak'; 
                  }} 
                />
              ) : (
                <div className="admin-menu-product-image-placeholder">
                  <span>{item.nama_varian}</span>
                </div>
              )}
              
              <div className="admin-menu-product-info">
                <div className="admin-menu-text-info">
                  <span className="admin-menu-product-name">{item.nama_varian}</span>
                  <span className="admin-menu-product-price">{formatRupiah(item.harga)}</span>
                </div>
                
                <div className="admin-menu-actions">
                  <button className="admin-menu-edit-btn" onClick={() => navigate(`/admin/edit-menu/${item.id_produk}`)}>
                    <img src={editIconImg} alt="Edit" className="admin-menu-edit-icon" />
                  </button>
                  <button className="admin-menu-delete-btn" onClick={() => handleDelete(item.id_produk)}>
                    <img src={deleteIconImg} alt="Delete" className="admin-menu-delete-icon" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-menu-bottom-actions">
          <button className="admin-menu-action-btn" onClick={() => navigate('/admin/dashboard')}>
            <img src={arrowBack} alt="Back" className="admin-menu-back-icon" /> Kembali
          </button>
          <button className="admin-menu-action-btn" onClick={() => navigate('/admin/tambah-menu')}>
            Tambah Menu
          </button>
        </div>
      </div>
    </div>
  );
}