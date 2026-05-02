import { useState, useRef } from 'react';
import './AddMenuPage.css';

export default function AddMenuPage() {
  // State untuk form input (dimulai dengan kosong)
  const [namaMenu, setNamaMenu] = useState('');
  const [hargaMenu, setHargaMenu] = useState('');
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
    }
  };

  const handleSubmit = () => {
    // Di sini nanti logika untuk menyimpan data ke database backend Anda
    console.log("Menyimpan menu baru:", { namaMenu, hargaMenu, fotoNama });
    alert("Menu baru berhasil ditambahkan!"); // Simulasi notifikasi sukses
  };

  return (
    <div className="add-page-container">
      {/* Latar Belakang Pola */}
      <div className="bg-pattern"></div>
      
      {/* Dekorasi Cookie Kanan Bawah */}
      <div className="decor-cookie-bottom"></div>

      <div className="add-page-content">
        <h1 className="add-page-title">Shan's Tambah</h1>

        <div className="form-section">
          <div className="form-group">
            <label>Nama :</label>
            <input 
              type="text" 
              className="add-input" 
              placeholder="..."
              value={namaMenu}
              onChange={(e) => setNamaMenu(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Harga :</label>
            <input 
              type="text" 
              className="add-input" 
              placeholder="..."
              value={hargaMenu}
              onChange={(e) => setHargaMenu(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tambah Foto :</label>
            {/* Custom Upload Box */}
            <div className="add-input upload-box" onClick={handleUploadClick}>
              <span className={fotoNama ? "upload-text active" : "upload-text"}>
                {fotoNama ? fotoNama : 'Upload foto'}
              </span>
              {/* Ikon Upload Panah Atas */}
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

        {/* Tombol Aksi Bawah */}
        <div className="bottom-actions">
          <button className="btn-action">
            <span>&#8592;</span> Kembali
          </button>
          <button className="btn-action" onClick={handleSubmit}>
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}