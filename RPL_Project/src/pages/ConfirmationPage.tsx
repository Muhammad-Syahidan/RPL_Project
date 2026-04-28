import './ConfirmationPage.css';

export default function ConfirmationPage() {
  return (
    <div className="confirmation-container">
      {/* Elemen Visual Dekoratif */}
      {/* Nanti ganti dengan tag <img src={...} /> jika gambar sudah dipotong dari desain */}
      <div className="decor-choco-drip">
        <span className="placeholder-text">Gambar Lelehan Cokelat</span>
      </div>
      <div className="decor-cookie">
        <span className="placeholder-text">Gambar Cookie</span>
      </div>

      {/* Konten Utama di Tengah */}
      <div className="confirmation-content">
        <h1 className="title-thanks">Terima Kasih Brownie!</h1>
        <h2 className="subtitle-process">Pesanan Kamu Akan Segera Diproses</h2>
        
        <button className="btn-cek-pesanan">
          Cek Pesanan Saya
        </button>
      </div>
    </div>
  );
}