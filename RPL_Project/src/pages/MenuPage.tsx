import './MenuPage.css';

// Data produk berdasarkan desain Anda
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

export default function MenuPage() {
  return (
    <div className="menu-container">
      {/* Latar belakang pola (pattern) */}
      <div className="bg-pattern"></div>
      
      <div className="menu-content">
        <h1 className="menu-title">Shan's Menu</h1>

        {/* Filter Kategori */}
        <div className="category-filter">
          <button className="category-btn">Fudgy Brownies</button>
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
                {/* Ganti div ini dengan <img src={item.imgUrl} /> jika gambar sudah ada */}
                <span>Gambar {item.name}</span>
              </div>
              
              <div className="product-info">
                <div className="text-info">
                  <span className="product-name">{item.name}</span>
                  <span className="product-price">{item.price}</span>
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
          ))}
        </div>

        {/* Tombol Aksi Bawah */}
        <div className="bottom-actions">
          <button className="action-btn">
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