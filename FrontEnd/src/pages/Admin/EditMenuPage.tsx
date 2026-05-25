import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditMenuPage.css';
import arrowBack from '../../assets/arrow_back.png';
import cookieDecorationImg from '../../assets/Cookie Decoration.png';
import uploadIcon from '../../assets/Upload.png';

export default function EditMenuPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [namaMenu, setNamaMenu] = useState('Mini Cake');
  const [hargaMenu, setHargaMenu] = useState('35000');
  const [fotoNama, setFotoNama] = useState('Upload foto');

  return (
    <div className="admin-edit-container">
      <div className="admin-edit-bg-pattern"></div>
      <img src={cookieDecorationImg} alt="Deco" className="admin-edit-cookie-decoration" />

      <div className="admin-edit-content">
        <h1 className="admin-edit-title">Shan's Edit</h1>

        <div className="admin-edit-layout">
          {/* Preview Card */}
          <div className="admin-edit-preview-card">
            <div className="admin-edit-preview-image">Gambar</div>
            <div className="admin-edit-preview-name">{namaMenu}</div>
            <div className="admin-edit-preview-price">Rp {Number(hargaMenu).toLocaleString('id-ID')}</div>
          </div>

          {/* Form */}
          <div className="admin-edit-form-section">
            <div className="admin-edit-form-group">
              <label>Nama :</label>
              <input className="admin-edit-input" value={namaMenu} onChange={(e) => setNamaMenu(e.target.value)} />
            </div>
            <div className="admin-edit-form-group">
              <label>Harga :</label>
              <input className="admin-edit-input" value={hargaMenu} onChange={(e) => setHargaMenu(e.target.value)} />
            </div>
            <div className="admin-edit-form-group">
              <label>Edit Foto :</label>
              <div className="admin-edit-input admin-edit-upload-box" onClick={() => fileInputRef.current?.click()}>
                <span>{fotoNama}</span>
                <img src={uploadIcon} alt="Up" className="admin-edit-upload-icon" />
              </div>
              <input type="file" className="admin-edit-hidden-input" ref={fileInputRef} onChange={(e) => setFotoNama(e.target.files?.[0]?.name || 'Upload foto')} />
            </div>
          </div>
        </div>

        <div className="admin-edit-bottom-actions">
          <button className="admin-edit-btn" onClick={() => navigate('/admin/menu')}>
            <img src={arrowBack} alt="Back" style={{ width: '18px' }} /> Kembali
          </button>
        </div>
      </div>
    </div>
  );
}