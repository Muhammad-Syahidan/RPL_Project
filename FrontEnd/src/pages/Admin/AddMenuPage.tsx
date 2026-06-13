import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMenuPage.css';
import arrowBack from '../../assets/arrow_back.png';
import cookieDecorationImg from '../../assets/Cookie Decoration.png';
import uploadIcon from '../../assets/Upload.png';

export default function AddMenuPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [namaMenu, setNamaMenu] = useState('');
  const [hargaMenu, setHargaMenu] = useState('');
  const [stok, setStok] = useState('');
  const [fotoNama, setFotoNama] = useState('Upload foto');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFotoNama(e.target.files[0].name);
    }
  };

  const handleSubmit = async () => {
    if (!namaMenu || !hargaMenu) return alert("Nama dan Harga wajib diisi!");

    const formData = new FormData();
    formData.append('nama_varian', namaMenu);
    formData.append('harga', hargaMenu);
    formData.append('stok', stok || '0');
    
    const file = fileInputRef.current?.files?.[0];
    if (file) formData.append('foto', file);

    try {
      // Pastikan fetch mengarah ke /api/menus (sesuai server.js)
      const response = await fetch('http://localhost:5000/api/menus', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Berhasil ditambahkan!");
        navigate('/admin/menu');
      } else {
        const errorData = await response.json();
        alert("Gagal: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan koneksi.");
    }
  };

  return (
    <div className="admin-add-container">
      <div className="admin-add-content">
        <h1 className="admin-add-title">Shan's Tambah</h1>

        <div className="admin-add-form-group">
          <label>Nama :</label>
          <input className="admin-add-input" value={namaMenu} onChange={(e) => setNamaMenu(e.target.value)} />
        </div>

        <div className="admin-add-form-group">
          <label>Harga :</label>
          <input className="admin-add-input" type="number" value={hargaMenu} onChange={(e) => setHargaMenu(e.target.value)} />
        </div>

        <div className="admin-add-form-group">
          <label>Stok :</label>
          <input className="admin-add-input" type="number" value={stok} onChange={(e) => setStok(e.target.value)} />
        </div>

        <div className="admin-add-form-group">
          <label>Tambah Foto :</label>
          <div className="admin-add-input admin-add-upload-box" onClick={() => fileInputRef.current?.click()}>
            <span>{fotoNama}</span>
            <img src={uploadIcon} alt="Upload" className="admin-add-upload-icon" />
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="admin-add-hidden-file-input" accept="image/*" />
        </div>

        <div className="admin-add-bottom-actions">
          <button className="admin-add-btn-action" onClick={() => navigate('/admin/menu')}>Kembali</button>
          <button className="admin-add-btn-action" onClick={handleSubmit}>Selesai</button>
        </div>
      </div>
    </div>
  );
}