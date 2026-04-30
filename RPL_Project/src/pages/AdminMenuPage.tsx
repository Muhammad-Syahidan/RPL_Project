import './AdminMenuPage.css';

// Data produk sementara
const menuItems = [
  { id: 1, name: 'Mini Cake', price: 'Rp 35.000', imgUrl: 'placeholder' },
  { id: 2, name: 'Matcha Cookies', price: 'Rp 7.000', imgUrl: 'placeholder' },
  { id: 3, name: 'Red Velvet Cookies', price: 'Rp 6.000', imgUrl: 'placeholder' },
  { id: 4, name: 'Oreo Cookies', price: 'Rp 6.000', imgUrl: 'placeholder' },
  { id: 5, name: 'Chocolate Cookies', price: 'Rp 7.000', imgUrl: 'placeholder' },
  { id: 6, name: 'Fudgy Brownies Cup', price: 'Rp 7.000', imgUrl: 'placeholder' },
  { id: 7, name: 'Fudgy Brownies Box - M (10x10)', price: 'Rp 23.000', imgUrl: 'placeholder' },
  { id: 8, name: 'Fudgy Brownies Box - L (20x10)', price: 'Rp 43.000', imgUrl: 'placeholder' },
  { id: 9, name: 'Fudgy Brownies Box - XL (20x20)', price: 'Rp 82.000', imgUrl: 'placeholder' },
];

export default function AdminMenuPage() {

  // Fungsi simulasi untuk aksi admin
  const handleEdit = (id: number) => {
    console.log(`Buka modal/halaman edit untuk produk ID: ${id}`);
    // Di sini nanti logika untuk mengedit atau menghapus menu
  };

  const handleAdd = () => {
    console.log('Buka form tambah menu baru');
    // Di sini nanti logika untuk menambah menu baru
  };

  return (
    <div className="admin-menu-container">
      {/* Latar Belakang Pola */}
      <div className="bg-pattern"></div>
      
      {/* Dekorasi Cookie Kanan Bawah */}
      <div className="decor-cookie-bottom"></div>

      <div className="admin-menu-content">
        <h1 className="admin-menu-title">shan's Menu</h1>

        {/* Filter Kategori */}
        <div className="category-filter">
          <button className="category-btn active">Fudgy Brownies</button>
          <button className="category-btn">Mini Cake</button>
          <button className="category-btn">Churros</button>
          <button className="category-btn">Cookies</button>
        </div>

        {/* Grid Produk */}
        <div className="product-grid">
          {menuItems.map((item) => (
            <div className="product-card" key={item.id}>
              {/* Tempat Gambar */}
              <div className="product-image-placeholder">
                <span>Gambar {item.name}</span>
              </div>
              
              <div className="product-info">
                <div className="text-info">
                  <span className="product-name">{item.name}</span>
                  <span className="product-price">{item.price}</span>
                </div>
                {/* Tombol Edit Admin */}
                <button 
                  className="edit-btn" 
                  onClick={() => handleEdit(item.id)}
                  title="Edit Menu"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Aksi Bawah */}
        <div className="bottom-actions">
          <button className="action-btn">
            <span>&#8592;</span> Kembali
          </button>
          <button className="action-btn" onClick={handleAdd}>
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}