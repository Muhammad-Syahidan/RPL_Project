import { useState, useRef } from 'react';
import './PaymentPage.css';
import { useNavigate } from 'react-router-dom';
import qrisImage from '../assets/qris.png';

export default function PaymentPage() {
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    navigate('/confirmation');
  };

  return (
    <div className="payment-container">
      {/* Dekorasi Pojok Kanan Atas */}
      <div className="bg-pattern-corner"></div>

      <div className="payment-content">
        <h1 className="payment-title">Pembayaran</h1>

        <div className="payment-section">
          <p className="section-label">
            Pembayaran Melalui Qris atau Transfer :
          </p>

          <div className="qris-transfer-wrapper">
            <div className="qr-box">
              <img src={qrisImage} alt="QRIS Code" />
            </div>

            <div className="transfer-details">
              <span className="text-atau">atau melalui</span>

              <div className="bank-info">
                <span className="bank-name">Bank Mandiri :</span>

                <span className="bank-number">
                  1329321441441
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-section">
          <p className="section-label">
            Silahkan Upload Bukti Pembayaran Anda :
          </p>

          <div className="upload-box" onClick={handleBoxClick}>
            <span className="file-name-display">
              {fileName ? fileName : ''}
            </span>

            <button
              type="button"
              className="btn-pilih-files"
            >
              Pilih Files
            </button>

            <input
              type="file"
              className="hidden-file-input"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
          </div>
        </div>

        <div className="submit-section">
          <button
            className="btn-selesai"
            onClick={handleSubmit}
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}