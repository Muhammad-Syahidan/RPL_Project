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

// Interface baru untuk item di dalam keranjang
interface CartItem extends MenuData {
  quantity: number;
}

export default function MenuPage() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<MenuData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  
  // State untuk menampung item di keranjang
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Ambil data keranjang lama dari localStorage jika ada saat page di-load
    const savedCart = localStorage.getItem('shans_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

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

  // Sinkronisasikan data keranjang ke localStorage setiap kali ada perubahan data di state 'cart'
  useEffect(() => {
    localStorage.setItem('shans_cart', JSON.stringify(cart));
  }, [cart]);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', maximumFractionDigits: 0
    }).format(angka || 0);
  };

  // --- FUNGSI LOGIKA KERANJANG ---
  
  // 1. Tambah ke keranjang / Naikkan quantity (+1)
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

  // 2. Kurangi kuantitas item (-1) / hapus jika quantity mencapai 0
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

  // 3. Menghitung total item yang ada di keranjang untuk lencana/badge angka
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // 4. Menghitung total harga belanjaan
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.harga * item.quantity), 0);
  };

  // 5. Fungsi navigasi ke halaman checkout dengan membawa seluruh isi keranjang
  const handleCheckout = () => {
    if (cart.length === 0) return alert("Keranjang kamu masih kosong!");
    navigate('/checkout', { state: { infoKeranjang: cart, totalHarga: getTotalPrice() } });
  };

  // 6. Fungsi untuk mengarahkan ke WhatsApp
  const handleWhatsAppChat = () => {
    window.open('https://wa.me/6282291323396', '_blank'); // Silakan ganti nomor WA Anda di sini
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
        
        {/* Render Kategori */}
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

        {/* Grid Produk */}
        <div className="product-grid">
          {filteredMenus.length > 0 ? (
            filteredMenus.map((item) => {
              // Cek apakah item ini sudah ada di dalam keranjang
              const cartItem = cart.find((c) => c.id_produk === item.id_produk);
              
              return (
                <div className="product-card" key={item.id_produk}>
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

                    {/* Mengubah tombol tambah menjadi tombol dinamis (bisa + dan - jika sudah dimasukkan ke keranjang) */}
                    {cartItem ? (
                      <div className="quantity-control">
                        <button className="qty-btn" onClick={() => removeFromCart(item.id_produk)}>-</button>
                        <span className="qty-count">{cartItem.quantity}</span>
                        <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                      </div>
                    ) : (
                      <button className="add-btn" onClick={() => addToCart(item)}>
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

        {/* Aksi Bawah */}
        <div className="bottom-actions">
          <button className="action-btn back-btn" onClick={() => navigate('/home')}>
            <img src={arrowBack} alt="Back" className="back-icon" /> Kembali
          </button>
          
          {/* Tombol utama diubah fungsinya untuk memicu Checkout massal */}
          <button className="action-btn checkout-btn" onClick={handleCheckout}>
            Keranjang ({getTotalItems()}) — {formatRupiah(getTotalPrice())}
          </button>

          {/* Tombol WhatsApp Baru di Samping Kanan Tombol Keranjang */}
          <button className="action-btn whatsapp-btn" onClick={handleWhatsAppChat}>
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}