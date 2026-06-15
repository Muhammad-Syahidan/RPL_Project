import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css';

import browniesLapisImg from '../../assets/browniesLapis.png'; 
import orangeCircleImg from '../../assets/background_bulat.png';
import logoImg from '../../assets/logo.png'; 

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUsername', data.admin?.username || 'admin');
        alert("Login Berhasil!");
        navigate('/admin/dashboard');
      } else {
        alert(data.message || "Username atau password salah!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal terhubung ke server, pastikan backend sudah berjalan.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-visual" />

      <div className="admin-login-form-section">
        <div className="admin-login-header-absolute">
          <h1 className="admin-login-title">Halo, Shan!</h1>
          <img src={logoImg} alt="Logo" className="admin-login-logo-img" />
        </div>
        
        <form onSubmit={handleLogin} className="admin-login-form">
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="admin-login-input"
            required 
          />
          
          <div className="admin-password-wrapper">
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-login-input"
              required 
            />
            <button 
              type="button" 
              className="admin-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>

          <button type="submit" className="admin-login-btn-submit">
            Login
          </button>
        </form>

        <img src={orangeCircleImg} alt="Circle" className="admin-orange-circle-decoration" />
        <img src={browniesLapisImg} alt="Brownies" className="admin-decor-brownies-lapis" />
      </div>
    </div>
  );
}