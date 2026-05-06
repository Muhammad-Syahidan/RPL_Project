import { useState, useRef } from 'react';
import './EditMenuPage.css';

export default function EditMenuPage() {
  // State untuk menyimpan data form yang bisa diedit
  const [namaMenu, setNamaMenu] = useState('Mini Cake');
  const [hargaMenu, setHargaMenu] = useState('Rp 35.000');
  const [fotoNama, setFotoNama] = useState('');

  // Referensi untuk input file tersembunyi
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoNama(file.name);
      // Di aplikasi nyata, di sini Anda juga bisa membuat URL sementara untuk menampilkan preview gambar
    }
  };

  return (
    <div className="edit-page-container">
      {/* Latar Belakang Pola */}
      <div className="bg-pattern"></div>
      
      {/* Dekorasi Cookie Kanan Bawah */}
      <div className="decor-cookie-bottom"></div>

      <div className="edit-page-content">
        <h1 className="edit-page-title">Shan's Edit</h1>

        <div className="edit-layout">
          
          {/* Kolom Kiri: Preview Kartu Produk */}
          <div className="preview-section">
            <div className="preview-card-large">
              <div className="preview-image-box">
                {/* Ganti dengan <img src="..." /> nanti */}
                <span className="img-placeholder">Gambar {namaMenu}</span>
              </div>
              <div className="preview-info">
                <span className="preview-name">{namaMenu || 'Nama Menu'}</span>
                <span className="preview-price">{hargaMenu || 'Rp 0'}</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Form Edit */}
          <div className="form-section">
            <div className="form-group">
              <label>Nama :</label>
              <input 
                type="text" 
                className="edit-input" 
                value={namaMenu}
                onChange={(e) => setNamaMenu(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Harga :</label>
              <input 
                type="text" 
                className="edit-input" 
                value={hargaMenu}
                onChange={(e) => setHargaMenu(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Edit Foto :</label>
              {/* Custom Upload Box */}
              <div className="edit-input upload-box" onClick={handleUploadClick}>
                <span className={fotoNama ? "upload-text active" : "upload-text"}>
                  {fotoNama ? fotoNama : 'Upload foto'}
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              {/* Input file asli disembunyikan */}
              <input 
                type="file" 
                className="hidden-file-input" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>

        </div>

        {/* Tombol Kembali */}
        <div className="bottom-action">
          <button className="btn-kembali">
            <span>&#8592;</span> Kembali
          </button>
        </div>
      </div>
    </div>
  );
}