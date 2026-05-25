import './ConfirmationPage.css';
import { useNavigate } from 'react-router-dom';

import chocoDrip from '../assets/ChocoDrip.png';
import cookieDecoration from '../assets/Cookie Decoration.png';

export default function ConfirmationPage() {

  const navigate = useNavigate();

  const handleCheckOrder = () => {
    navigate('/account');
  };

  return (
    <div className="confirmation-container">

      {/* Dekorasi Kiri Atas */}
      <img
        src={chocoDrip}
        alt="Choco Drip"
        className="decor-choco-drip"
      />

      {/* Dekorasi Kanan Bawah */}
      <img
        src={cookieDecoration}
        alt="Cookie Decoration"
        className="decor-cookie"
      />

      {/* Konten Tengah */}
      <div className="confirmation-content">

        <h1 className="title-thanks">
          Terima Kasih Brownie!
        </h1>

        <h2 className="subtitle-process">
          Pesanan Kamu Akan Segera Diproses
        </h2>

        <button
          className="btn-cek-pesanan"
          onClick={handleCheckOrder}
        >
          Cek Pesanan Saya
        </button>

      </div>
    </div>
  );
}