import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

import logoBenarImg from '../assets/logo2.png'; // Logo Shan's Bakery & Cake
import landingPageKiriImg from '../assets/Landing_Page_Kiri.png';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

      {/* LEFT: replaced with single landing image */}
      <div className="landing-visual">
        <img
          src={landingPageKiriImg}
          alt="Landing Page Kiri"
          className="landing-left-image"
        />
      </div>

      {/* RIGHT: content */}
      <div className="landing-content">
        <div className="top-navigation">
          <span className="nav-account" onClick={() => navigate('/login')}>Account</span>
          <img src={logoBenarImg} alt="Shan's Bakery & Cake Logo" className="baker-logo-landing" />
        </div>

        <div className="content-inner">
          <div className="text-section">
            <h1 className="landing-title">
              Let's Order<br />
              The Homemade<br />
              Cakes!
            </h1>

            <p className="landing-sub">Freshly baked, lovingly made — order your favorites now.</p>

            <button
              className="btn-order-here"
              onClick={() => navigate('/menu')}
            >
              Order Here!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}