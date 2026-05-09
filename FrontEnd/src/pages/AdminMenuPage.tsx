import { useState } from 'react';
import axios from 'axios';

function AdminMenu() {
  // State untuk menyimpan ketikan admin di form
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: ''
  });

  // Mengatur perubahan teks saat admin mengetik
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi saat tombol "Simpan Kue" diklik
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Mencegah halaman refresh
    try {
      const response = await axios.post('http://localhost:5000/api/menus', formData);
      alert("Sukses: " + response.data.message);
      
      // Kosongkan form setelah berhasil
      setFormData({ name: '', description: '', price: '', image_url: '' });
    } catch (error) {
      console.error("Gagal menambah menu:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  // CSS sederhana menggunakan Flexbox agar tampilan rapi di tengah
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Dashboard Admin - Tambah Menu</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label>Nama Kue:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          
          <div>
            <label>Deskripsi Singkat:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          
          <div>
            <label>Harga (Rp):</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          
          <div>
            <label>Link Gambar URL:</label>
            <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://..." style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
          </div>
          
          <button type="submit" style={{ padding: '10px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Simpan Kue ke Database
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminMenu;