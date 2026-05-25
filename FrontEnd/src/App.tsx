import { Routes, Route } from 'react-router-dom';
import LoginPages from './pages/LoginPages';
import OtpPage from './pages/OtpPage';
import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import PaymentPage from './pages/PaymentPage';
import AccountPage from './pages/AccountPage';
import AdminLoginPage from './pages/Admin/AdminLoginPage';
import AdminDashboard from './pages/Admin/DashboardPage'; 
import AdminMenuPage from './pages/Admin/AdminMenuPage';
import ReportPage from './pages/Admin/ReportPage';
import AddMenuPage from './pages/Admin/AddMenuPage';
import EditMenuPage from './pages/Admin/EditMenuPage';
import OrderStatusPage from './pages/Admin/OrderStatusPage';

function App() {
  return (
    <Routes>
      {/* 1. Halaman Utama */}
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
      
      {/* 4. Halaman Akun */}
      <Route path="/account" element={<AccountPage />} />

      {/* 5. Alur Admin */}
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* 2. Tambahkan route ini! */}
      <Route path="/admin/menu" element={<AdminMenuPage />} />
      <Route path="/admin/report" element={<ReportPage />} />
      <Route path="/admin/tambah-menu" element={<AddMenuPage />} />
      <Route path="/admin/edit-menu/:id" element={<EditMenuPage />} />
      <Route path="/admin/order-status" element={<OrderStatusPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      
      
    </Routes>
  );
}

export default App;