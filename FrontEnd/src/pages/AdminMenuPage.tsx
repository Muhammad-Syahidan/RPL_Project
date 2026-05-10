import React, { useState } from 'react';
import axios from 'axios';
import './AdminMenuPage.css'; // Memanggil file desain Anda

function AdminMenuPage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image_file: null as File | null // Mengakomodasi file foto
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image_file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 1. Siapkan "Kotak Paket" khusus
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('price', formData.price);
    submitData.append('description', ''); // Sesuai desain, kita kosongkan dulu

    // 2. Masukkan file foto ke dalam paket jika ada
    if (formData.image_file) {
      submitData.append('image_file', formData.image_file);
    }

    try {
      // 3. Kirim paket dengan stempel khusus (multipart/form-data)
      const response = await axios.post('http://localhost:5000/api/menus', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert("Sukses: " + response.data.message);
      
      // Kosongkan form kembali setelah berhasil
      setFormData({ name: '', price: '', image_file: null });
      
    } catch (error) {
      console.error("Gagal menambah menu:", error);
      alert("Terjadi kesalahan saat menyimpan data ke database.");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Shan's Tambah</h1>
      
      <form className="admin-form" onSubmit={handleSubmit}>
        
        <div className="input-group">
          <label>Nama :</label>
          <input 
            type="text" 
            name="name" 
            className="custom-input" 
            placeholder="..." 
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
            placeholder="..." 
            value={formData.price} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label>Tambah Foto :</label>
          <div className="file-upload-wrapper">
            <span>Upload foto &uarr;</span>
            <input 
              type="file" 
              name="image_file" 
              accept="image/*"
              onChange={handleFileChange} 
            />
          </div>
        </div>

        <div className="button-group">
          <button type="button" className="btn-action">
            &larr; Kembali
          </button>
          <button type="submit" className="btn-action">
            Selesai
          </button>
        </div>

      </form>

      {/* Gambar cookie pojok kanan bawah. Pastikan Anda punya gambar cookies.png di folder public */}
      <img src="/cookies.png" alt="Cookies" className="cookie-decoration" />
    </div>
  );
}

export default AdminMenuPage;