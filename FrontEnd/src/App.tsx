import { Routes, Route } from 'react-router-dom';
import LoginPages from './pages/LoginPages'; // Halaman Registrasi Utama
import OtpPage from './pages/OtpPage'; // Import Halaman OTP baru
import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import OrderStatusPage from './pages/OrderStatusPage';
import PaymentPage from './pages/PaymentPage';
import DashboardPage from './pages/DashboardPage'; // Untuk tampilan Admin

function App() {
  return (
    <Routes>
      {/* 1. Halaman yang muncul pertama kali (localhost:5173) */}
      <Route path="/" element={<LoginPages />} />
      
      {/* 2. Alur Registrasi & OTP */}
      <Route path="/otp" element={<OtpPage />} />

      {/* 3. Alur Pelanggan */}
      <Route path="/home" element={<LandingPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      <Route path="/status" element={<OrderStatusPage />} />

      {/* 4. Alur Admin / Pemilik Usaha */}
      <Route path="/admin/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;