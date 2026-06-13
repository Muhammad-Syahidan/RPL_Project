import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import PaymentPage from './pages/PaymentPage';
import CheckOrderPage from './pages/CheckOrderPage'; 
import AdminLoginPage from './pages/Admin/AdminLoginPage';
import AdminDashboard from './pages/Admin/DashboardPage'; 
import AdminMenuPage from './pages/Admin/AdminMenuPage';
import ReportPage from './pages/Admin/ReportPage'; // Pastikan file ini ada
import AddMenuPage from './pages/Admin/AddMenuPage';
import EditMenuPage from './pages/Admin/EditMenuPage';
import AdminOrderStatusPage from './pages/Admin/AdminOrderStatusPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      <Route path="/check-order" element={<CheckOrderPage />} />
      
      {/* Alur Admin */}
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/menu" element={<AdminMenuPage />} />
      <Route path="/admin/report" element={<ReportPage />} />
      <Route path="/admin/tambah-menu" element={<AddMenuPage />} />
      <Route path="/admin/edit-menu/:id" element={<EditMenuPage />} />
      <Route path="/admin/order-status" element={<AdminOrderStatusPage />} />
    </Routes>
  );
}

export default App;