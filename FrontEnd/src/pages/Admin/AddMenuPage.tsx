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
  const [fotoNama, setFotoNama] = useState('Upload foto');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFotoNama(e.target.files[0].name);
    }
  };

  const handleSubmit = () => {
    console.log("Data:", { namaMenu, hargaMenu });
    alert("Berhasil!");
  };

  return (
    <div className="admin-add-container">
      <div className="admin-add-bg-pattern"></div>
      <img src={cookieDecorationImg} alt="Decoration" className="admin-add-cookie-decoration" />
      
      <div className="admin-add-content">
        <h1 className="admin-add-title">Shan's Tambah</h1>

        <div className="admin-add-form-group">
          <label>Nama :</label>
          <input 
            className="admin-add-input" 
            placeholder="..." 
            value={namaMenu} 
            onChange={(e) => setNamaMenu(e.target.value)} 
          />
        </div>

        <div className="admin-add-form-group">
          <label>Harga :</label>
          <input 
            className="admin-add-input" 
            placeholder="..." 
            value={hargaMenu} 
            onChange={(e) => setHargaMenu(e.target.value)} 
          />
        </div>

        <div className="admin-add-form-group">
          <label>Tambah Foto :</label>
          <div className="admin-add-input admin-add-upload-box" onClick={() => fileInputRef.current?.click()}>
            <span>{fotoNama}</span>
            <img src={uploadIcon} alt="Upload" className="admin-add-upload-icon" />
          </div>
          <input 
            type="file" 
            className="admin-add-hidden-file-input" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*"
          />
        </div>

        <div className="admin-add-bottom-actions">
          <button className="admin-add-btn-action" onClick={() => navigate('/admin/menu')}>
            <img src={arrowBack} alt="Back" className="admin-add-back-icon" />
            Kembali
          </button>
          <button className="admin-add-btn-action" onClick={handleSubmit}>
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}