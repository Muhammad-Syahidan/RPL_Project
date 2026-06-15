import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

const isAdminAuthenticated = () => {
  return localStorage.getItem('adminLoggedIn') === 'true';
};

interface AdminProtectedRouteProps {
  children: ReactElement;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  return isAdminAuthenticated() ? children : <Navigate to="/admin/login" replace />;
}
