import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPages.css';

import browniesBg from '../assets/browniesFull.png';
import browniesLapis from '../assets/browniesLapis.png';
import backgroundBulat from '../assets/background_bulat.png';

export default function LoginPages() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi input
    if (!username || !password) {
      alert('Username dan password harus diisi');
      return;
    }

    // TODO: Implementasi logic login dengan backend
    console.log('Login attempt:', { username, password });
    
    // Simulasi login berhasil - ubah sesuai kebutuhan
    if (username && password) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">

        {/* LEFT SIDE */}
        <div
          className="login-visual"
          style={{ backgroundImage: `url(${browniesBg})` }}
        ></div>

        {/* RIGHT SIDE */}
        <div className="login-form-section">
          <div className="header-wrapper">
            <h1 className="title">Admin<br />Login</h1>
            <div className="logo-icon">👁️</div>
          </div>

          <form onSubmit={handleLogin} className="form-container">
            {/* Username Input */}
            <label className="input-label">Username :</label>
            <div className="input-group">
              <input
                type="text"
                className="text-input"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <label className="input-label">Password :</label>
            <div className="input-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="text-input"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Sembunyikan' : 'Tampilkan'}
              >
                {showPassword ? 'Sembunyikan' : 'Tampilkan'}
              </button>
            </div>

            <button type="submit" className="btn-submit">
              Login
            </button>
          </form>

          <div className="bottom-decoration">
            <img src={backgroundBulat} className="circle-bg" alt="" />
            <img src={browniesLapis} className="brownies-lapis" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}