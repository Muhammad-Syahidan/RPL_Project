import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import semua halaman yang sudah kita buat
// (Pastikan letak foldernosya sesuai dengan struktur proyek Anda)
import LandingPage from './pages/LandingPage';
import LoginPages from './pages/LoginPages';
import MenuPage from './pages/MenuPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminMenuPage from './pages/AdminMenuPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Jalur 1: Halaman Pembuka / Sambutan */}
          <Route path="/" element={<LandingPage />} />

          {/* Jalur 2: Halaman Login / Daftar */}
          <Route path="/login" element={<LoginPages />} />

          {/* Jalur 3: Halaman Katalog Menu */}
          <Route path="/menu" element={<MenuPage />} />

          {/* Jalur 4: Halaman Pembayaran */}
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Jalur 5: Halaman Khusus Admin (Sembunyi dari pelanggan) */}
          <Route path="/admin" element={<AdminMenuPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;