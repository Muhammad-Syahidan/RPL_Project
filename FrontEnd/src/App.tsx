import { Routes, Route } from 'react-router-dom';

// Import semua halaman yang sudah kita buat
import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  return (
    <Routes>
      {/* URL utama (/) akan langsung membuka Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* URL /menu akan membuka daftar kue */}
      <Route path="/menu" element={<MenuPage />} />
      
      {/* URL /checkout untuk form pemesanan */}
      <Route path="/checkout" element={<CheckoutPage />} />

      {/* URL /payment untuk halaman QRIS & Upload */}
      <Route path="/payment" element={<PaymentPage />} />

      {/* URL /confirmation untuk halaman Terima Kasih */}
      <Route path="/confirmation" element={<ConfirmationPage />} />
      
      {/* Rute 404 jika ada URL yang salah ketik */}
      <Route path="*" element={<h1 style={{textAlign: 'center', marginTop: '50px'}}>404 - Halaman Tidak Ditemukan</h1>} />
    </Routes>
  );
}

export default App;