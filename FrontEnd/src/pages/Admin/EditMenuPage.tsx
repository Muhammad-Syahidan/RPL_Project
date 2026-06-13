import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditMenuPage.css';
import arrowBack from '../../assets/arrow_back.png';
import cookieDecorationImg from '../../assets/Cookie Decoration.png';
import uploadIcon from '../../assets/Upload.png';

export default function EditMenuPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [namaMenu, setNamaMenu] = useState('');
  const [hargaMenu, setHargaMenu] = useState('');
  const [fotoLama, setFotoLama] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Mengambil data produk berdasarkan ID saat halaman dimuat
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/menus/${id}`);
        setNamaMenu(res.data.nama_varian);
        setHargaMenu(res.data.harga);
        setFotoLama(res.data.foto);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }
    };
    fetchMenu();
  }, [id]);

  // Fungsi untuk menyimpan perubahan ke database
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('nama_varian', namaMenu);
    formData.append('harga', hargaMenu);
    if (selectedFile) formData.append('foto', selectedFile);

    try {
      await axios.put(`http://localhost:5000/api/menus/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Produk berhasil diperbarui!");
      navigate('/admin/menu');
    } catch (error) {
      alert("Gagal memperbarui produk.");
    }
  };

  return (
    <div className="admin-edit-container">
      <div className="admin-edit-bg-pattern"></div>
      <img src={cookieDecorationImg} alt="Deco" className="admin-edit-cookie-decoration" />

      <div className="admin-edit-content">
        <h1 className="admin-edit-title">Shan's Edit</h1>

        <div className="admin-edit-layout">
          <div className="admin-edit-preview-card">
            {selectedFile ? (
              <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="admin-edit-preview-image" />
            ) : fotoLama ? (
              <img src={`http://localhost:5000/uploads/${encodeURI(fotoLama)}`} alt="Menu" className="admin-edit-preview-image" />
            ) : (
              <div className="admin-edit-preview-image">No Image</div>
            )}
            <div className="admin-edit-preview-name">{namaMenu || "Nama Menu"}</div>
            <div className="admin-edit-preview-price">Rp {Number(hargaMenu || 0).toLocaleString('id-ID')}</div>
          </div>

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
                <span>{selectedFile ? selectedFile.name : 'Upload foto baru'}</span>
                <img src={uploadIcon} alt="Up" className="admin-edit-upload-icon" />
              </div>
              <input type="file" className="admin-edit-hidden-input" ref={fileInputRef} onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
            </div>
          </div>
        </div>

        <div className="admin-edit-bottom-actions">
          <button className="admin-edit-btn" onClick={() => navigate('/admin/menu')}>
            <img src={arrowBack} alt="Back" style={{ width: '18px' }} /> Kembali
          </button>
          <button className="admin-edit-btn" style={{ marginLeft: '20px', backgroundColor: '#E2722B', color: '#342118' }} onClick={handleUpdate}>
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}