import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './EditMenuPage.css'; // Sifat styling bisa disamakan dengan AdminMenuPage

export default function EditMenuPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mengambil data kue yang dikirim saat tombol edit di-klik dari dashboard/katalog
  const produkLama = location.state?.produk;

  const [formData, setFormData] = useState({
    name: produkLama?.name || '',
    price: produkLama?.price || '',
    image_file: null as File | null
  });

  // Proteksi: Jika masuk ke halaman edit tanpa membawa data produk, kembalikan ke menu admin
  useEffect(() => {
    if (!produkLama) {
      alert("Pilih menu yang ingin diedit terlebih dahulu!");
      navigate('/admin');
    }
  }, [produkLama, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image_file: e.target.files[0] });
    }
  };

  // Fungsi menyimpan perubahan data ke database
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('price', formData.price);
    
    if (formData.image_file) {
      submitData.append('image_file', formData.image_file);
    }

    try {
      await axios.put(`http://localhost:5000/api/menus/${produkLama.id}`, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Sukses: Data menu berhasil diperbarui!");
      navigate('/menu'); // Kembali ke katalog setelah sukses
    } catch (error) {
      console.error("Gagal memperbarui menu:", error);
      alert("Terjadi kesalahan saat memperbarui data.");
    }
  };

  // Fungsi menghapus menu dari katalog
  const handleDelete = async () => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${produkLama.name}" dari katalog?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/menus/${produkLama.id}`);
        alert("Menu berhasil dihapus!");
        navigate('/menu');
      } catch (error) {
        console.error("Gagal menghapus menu:", error);
        alert("Terjadi kesalahan saat menghapus data.");
      }
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Shan's Edit</h1>
      
      <form className="admin-form" onSubmit={handleUpdate}>
        <div className="input-group">
          <label>Nama Kue :</label>
          <input 
            type="text" 
            name="name" 
            className="custom-input" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label>Harga :</label>
          <input 
            type="number" 
            name="price" 
            className="custom-input" 
            value={formData.price} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label>Ganti Foto (Opsional) :</label>
          <div className="file-upload-wrapper">
            <span>Ubah foto &uarr;</span>
            <input 
              type="file" 
              name="image_file" 
              accept="image/*"
              onChange={handleFileChange} 
            />
          </div>
        </div>

        <div className="button-group">
          <button type="button" className="btn-action" onClick={() => navigate(-1)}>
            &larr; Batal
          </button>
          <button type="button" className="btn-action" style={{ backgroundColor: '#d63031', color: 'white' }} onClick={handleDelete}>
            Hapus
          </button>
          <button type="submit" className="btn-action">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}