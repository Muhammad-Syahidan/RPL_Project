import { useState, useRef } from 'react';
import './PaymentPage.css';
import { useNavigate } from 'react-router-dom';
import qrisImage from '../assets/qris.png';

export default function PaymentPage() {
  const [fileName, setFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi: Hanya izinkan tipe image/jpeg (mencakup .jpg/.jpeg) dan image/png
      // Ini akan otomatis menolak .gif, .pdf, .docx, dll.
      const validTypes = ['image/jpeg', 'image/png'];
      
      if (!validTypes.includes(file.type)) {
        alert("Mohon pilih file gambar yang umum (JPG, JPEG, atau PNG)!");
        setFileName('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      setFileName(file.name);
    }
  };

  const handleSubmit = async () => {
    const file = fileInputRef.current?.files?.[0];
    const order_id = localStorage.getItem('user_order_id');

    if (!file) {
      alert("Mohon pilih file bukti pembayaran!");
      return;
    }

    if (!order_id) {
      alert("ID Pesanan tidak ditemukan. Silakan ulangi dari menu checkout.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('bukti', file);

    try {
      const response = await fetch(`http://localhost:5000/api/transaksi/upload-bukti/${order_id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Bukti pembayaran berhasil diunggah!");
        navigate('/confirmation');
      } else {
        throw new Error("Gagal mengunggah ke server");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan saat mengunggah bukti pembayaran.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="bg-pattern-corner"></div>

      <div className="payment-content">
        <h1 className="payment-title">Pembayaran</h1>

        <div className="payment-section">
          <p className="section-label">Pembayaran Melalui Qris atau Transfer :</p>
          <div className="qris-transfer-wrapper">
            <div className="qr-box">
              <img src={qrisImage} alt="QRIS Code" />
            </div>
            <div className="transfer-details">
              <span className="text-atau">atau melalui</span>
              <div className="bank-info">
                <span className="bank-name">Bank Mandiri :</span>
                <span className="bank-number">1329321441441</span>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-section">
          <p className="section-label">Silahkan Upload Bukti Pembayaran Anda :</p>
          <div className="upload-box" onClick={handleBoxClick}>
            <span className="file-name-display">
              {fileName ? fileName : 'Klik untuk memilih file (JPG/JPEG/PNG)'}
            </span>
            <button type="button" className="btn-pilih-files">Pilih Foto</button>
            <input
              type="file"
              className="hidden-file-input"
              ref={fileInputRef}
              onChange={handleFileChange}
              // Membatasi pilihan file di dialog browser ke tipe gambar umum
              accept="image/jpeg, image/png"
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <div className="submit-section">
          <button 
            className="btn-selesai" 
            onClick={handleSubmit} 
            disabled={isUploading}
          >
            {isUploading ? 'Mengunggah...' : 'Selesai'}
          </button>
        </div>
      </div>
    </div>
  );
}