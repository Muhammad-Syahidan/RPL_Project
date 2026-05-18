import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // Mengambil status login dari localStorage browser
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

  // Jika sudah login, izinkan masuk ke halaman yang dituju (Outlet)
  // Jika belum, tendang otomatis ke halaman /login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}