import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckOrderPage.css'; 
import chocoDrip from '../assets/ChocoDrip.png';
import arrowBack from '../assets/arrow_back.png';
import searchIcon from '../assets/Search.png';

const CheckOrderPage = () => {
  const navigate = useNavigate();
  const [kodePesanan, setKodePesanan] = useState('');
  const [orderData, setOrderData] = useState<any>(null);

  const handleSearch = async () => {
    // 1. Bersihkan spasi di awal/akhir input
    const cleanKode = kodePesanan.trim();
    if (!cleanKode) return;
    
    try {
      // 2. Encode karakter agar aman dikirim ke URL (seperti karakter '-')
      const response = await fetch(`http://localhost:5000/api/transaksi/cari/${encodeURIComponent(cleanKode)}`);
      
      if (response.ok) {
        const data = await response.json();
        setOrderData(data);
      } else {
        setOrderData(null);
        alert("Pesanan tidak ditemukan! Pastikan kode pesanan Anda benar.");
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      alert("Terjadi kesalahan koneksi ke server.");
    }
  };

  return (
    <div className="account-container">
      <div className="account-bg-pattern" />
      <img src={chocoDrip} alt="Choco Drip" className="deco-drip" />
      
      <div className="account-content">
        <h1 className="acc-title">Cek Pesanan</h1>

        {/* Search Bar */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Masukkan kode pesanan..." 
            value={kodePesanan}
            onChange={(e) => setKodePesanan(e.target.value)}
          />
          <button className="btn-search" onClick={handleSearch}>
            <img src={searchIcon} alt="Search" className="search-icon-img" />
          </button>
        </div>

        <hr className="divider" />
        <p className="subtitle-bottom">Masukkan Kode Pesanan Anda untuk Mengecek Status</p>

        {/* Tampilan Hasil Pencarian */}
        <div className="orders-container">
          {orderData && (
            <div className="order-card">
              <div className="order-info">
                <div className="order-title">Pesanan: {orderData.kode_pesanan}</div>
                <div className="order-detail">Nama Pelanggan: {orderData.nama_pelanggan}</div>
                <div className="order-detail">Opsi Pengiriman: {orderData.opsi_pengiriman}</div>
                <div className="order-detail">Metode Pembayaran: {orderData.metode_pembayaran}</div>
                <div className="order-detail">Total Bayar: Rp {orderData.total_bayar?.toLocaleString()}</div>
                <div className="order-status">Status : <strong>{orderData.status}</strong></div>
              </div>
            </div>
          )}
        </div>

        {/* Tombol Kembali */}
        <div className="btn-group">
          <button className="btn-action back-btn" onClick={() => navigate('/home')}>
            <img src={arrowBack} alt="Back" className="back-icon" /> Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOrderPage;