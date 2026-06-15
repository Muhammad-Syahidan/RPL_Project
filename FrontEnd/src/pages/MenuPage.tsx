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
  deskripsi_topping: string | null;
  stok: number;
}

interface CartItem extends MenuData {
  quantity: number;
}

export default function MenuPage() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<MenuData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuData | null>(null);
  
  // Keranjang diset kosong secara default agar reset setiap masuk halaman
  const [cart, setCart] = useState<CartItem[]>([]);

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

  const addToCart = (product: MenuData) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id_produk === product.id_produk);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id_produk === product.id_produk 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const openMenuCard = (menu: MenuData) => {
    setSelectedMenuItem(menu);
  };

  const closeMenuCard = () => {
    setSelectedMenuItem(null);
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id_produk === productId);
      if (existingItem?.quantity === 1) {
        return prevCart.filter((item) => item.id_produk !== productId);
      }
      return prevCart.map((item) =>
        item.id_produk === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.harga * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Keranjang kamu masih kosong!");
    navigate('/checkout', { state: { infoKeranjang: cart, totalHarga: getTotalPrice() } });
  };

  const handleWhatsAppChat = () => {
    window.open('https://wa.me/6282291323396', '_blank');
  };

  const categories = ['Semua', 'Fudgy Brownies', 'Mini Cake', 'Churros', 'Cookies'];

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
    <div className="menu-container">
      <div className="menu-bg-pattern"></div>
      <img src={cookieDecorationImg} alt="Cookie Decoration" className="cookie-decoration" />
      
      <div className="menu-content">
        <h1 className="menu-title">Shan's Menu</h1>
        
        <div className="category-filter">
          {categories.map((cat) => (
            <button 
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredMenus.length > 0 ? (
            filteredMenus.map((item) => {
              const cartItem = cart.find((c) => c.id_produk === item.id_produk);
              
              return (
                <div className="product-card" key={item.id_produk} onClick={() => openMenuCard(item)}>
                  {item.foto ? (
                    <img 
                      src={`http://localhost:5000/uploads/${encodeURIComponent(item.foto || '')}`} 
                      alt={item.nama_varian} 
                      className="product-image" 
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/260x260?text=Gambar+Tidak+Ada'; }} 
                    />
                  ) : (
                    <div className="product-image-placeholder"><span>{item.nama_varian}</span></div>
                  )}
                  
                  <div className="product-info">
                    <div className="text-info">
                      <span className="product-name">{item.nama_varian}</span>
                      <span className="product-price">{formatRupiah(item.harga)}</span>
                    </div>

                    {cartItem ? (
                      <div className="quantity-control" onClick={(e) => e.stopPropagation()}>
                        <button className="qty-btn" onClick={() => removeFromCart(item.id_produk)}>-</button>
                        <span className="qty-count">{cartItem.quantity}</span>
                        <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                      </div>
                    ) : (
                      <button className="add-btn" onClick={(e) => { e.stopPropagation(); addToCart(item); }}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="16"></line>
                          <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#5c3a21', marginTop: '20px', fontWeight: 600 }}>
              {menus.length === 0 ? "Memuat menu..." : "Menu tidak ditemukan untuk kategori ini."}
            </p>
          )}
        </div>

        {selectedMenuItem && (
          <div className="modal-overlay" onClick={closeMenuCard}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              {selectedMenuItem.foto ? (
                <img 
                  src={`http://localhost:5000/uploads/${encodeURIComponent(selectedMenuItem.foto || '')}`} 
                  alt={selectedMenuItem.nama_varian}
                  className="modal-image"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/480x480?text=Gambar+Tidak+Ada'; }}
                />
              ) : (
                <div className="modal-image-placeholder"><span>{selectedMenuItem.nama_varian}</span></div>
              )}
              <div className="modal-content">
                <h2>{selectedMenuItem.nama_varian}</h2>
                <p className="modal-description">{selectedMenuItem.deskripsi_topping || 'Deskripsi tidak tersedia.'}</p>
                <span className="modal-price">{formatRupiah(selectedMenuItem.harga)}</span>
                <button className="cancel-btn" onClick={closeMenuCard}>Batal</button>
              </div>
            </div>
          </div>
        )}

        <div className="bottom-actions">
          <button className="action-btn back-btn" onClick={() => navigate('/home')}>
            <img src={arrowBack} alt="Back" className="back-icon" /> Kembali
          </button>
          
          <button className="action-btn checkout-btn" onClick={handleCheckout}>
            Keranjang ({getTotalItems()}) — {formatRupiah(getTotalPrice())}
          </button>

          <button className="action-btn whatsapp-btn" onClick={handleWhatsAppChat}>
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}