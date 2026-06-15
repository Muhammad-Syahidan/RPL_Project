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
import ReportPage from './pages/Admin/ReportPage';
import AddMenuPage from './pages/Admin/AddMenuPage';
import EditMenuPage from './pages/Admin/EditMenuPage';
import AdminOrderStatusPage from './pages/Admin/AdminOrderStatusPage';
import AdminProtectedRoute from './pages/Admin/AdminProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      <Route path="/check-order" element={<CheckOrderPage />} />
      
      {/* Alur Admin */}
      {/* Akses /admin atau /admin/login akan menampilkan halaman Login */}
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      
      {/* Halaman setelah Login */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/menu"
        element={
          <AdminProtectedRoute>
            <AdminMenuPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/report"
        element={
          <AdminProtectedRoute>
            <ReportPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/tambah-menu"
        element={
          <AdminProtectedRoute>
            <AddMenuPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/edit-menu/:id"
        element={
          <AdminProtectedRoute>
            <EditMenuPage />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/order-status"
        element={
          <AdminProtectedRoute>
            <AdminOrderStatusPage />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;