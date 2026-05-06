import { useState, useRef } from 'react';
import './PaymentPage.css';

export default function PaymentPage() {
  // State untuk menyimpan nama file yang diunggah
  const [fileName, setFileName] = useState<string>('');
  
  // Referensi untuk menghubungkan UI kustom dengan input file asli
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fungsi untuk memicu input file saat kotak diklik
  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  // Fungsi untuk menangkap file yang dipilih pengguna
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="payment-container">
      {/* Dekorasi Pojok Kanan Atas */}
      <div className="bg-pattern-corner"></div>

      <div className="payment-content">
        <h1 className="payment-title">Pembayaran</h1>

        {/* Seksi QRIS & Transfer */}
        <div className="payment-section">
          <p className="section-label">Pembayaran Melalui Qris atau Transfer :</p>
          
          <div className="qris-transfer-wrapper">
            <div className="qr-box">
              {/* Nanti ganti div di bawah ini dengan tag <img src="..." /> QR Code asli */}
              <div className="qr-placeholder">
                [ Gambar QR Code ]
              </div>
            </div>
            
            <div className="transfer-details">
              <span className="text-atau">atau melalui</span>
              <div className="bank-info">
                <span className="bank-name">Bank Mandiri :</span>
                <span className="bank-account">1329321441441</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seksi Upload Bukti */}
        <div className="payment-section">
          <p className="section-label">Silahkan Upload Bukti Pembayaran Anda :</p>
          
          {/* Kotak Kustom Upload */}
          <div className="upload-box" onClick={handleBoxClick}>
            <span className="file-name-display">
              {fileName ? fileName : ''}
            </span>
            <button type="button" className="btn-pilih-files">Pilih Files</button>
            
            {/* Input asli yang disembunyikan */}
            <input
              type="file"
              className="hidden-file-input"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
          </div>
        </div>

        {/* Tombol Selesai */}
        <div className="submit-section">
          <button className="btn-selesai">Selesai</button>
        </div>

      </div>
    </div>
  );
}