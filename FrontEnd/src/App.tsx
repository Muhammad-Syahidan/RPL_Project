// 1. Hapus BrowserRouter as Router dari sini
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPages from './pages/LoginPages';
import MenuPage from './pages/MenuPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminMenuPage from './pages/AdminMenuPage';
import DashboardPage from './pages/DashboardPage';
import EditMenuPage from './pages/EditMenuPage';
import ConfirmationPage from './pages/ConfirmationPage';


import ProtectedRoute from './component/ProtectedRoute'; 

function App() {
  return (
    // 2. Hapus tag <Router> pembuka dan penutup di sini
    <div className="app-container">
      <Routes>
        {/* ================= RUTE PUBLIK ================= */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />


        {/* ================= RUTE TERPROTEKSI ================= */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminMenuPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/edit-menu" element={<EditMenuPage />} />
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;