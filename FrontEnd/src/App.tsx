import axios from 'axios';

function App() {
  // Fungsi ini akan berjalan ketika tombol diklik
  const handleTestLogin = async () => {
    try {
      // Mengirim request POST persis seperti di Postman
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        name: "Muhammad Fiqri Nazmul Hakim",
        email: "fiqrinazmul@contoh.com",
        google_id: "google_123456789"
      });

      // Menampilkan hasil dari backend ke console browser
      console.log("Respon dari Server:", response.data);
      
      // Menampilkan pop-up notifikasi di layar
      alert("Berhasil! Pesan dari server: " + response.data.message);

    } catch (error) {
      console.error("Gagal mengirim data:", error);
      alert("Yah, koneksi gagal. Cek console untuk detailnya.");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>Uji Coba Sistem Login Shan's Cake</h1>
      <p>Klik tombol di bawah ini untuk mengirim data ke database MySQL</p>
      
      <button 
        onClick={handleTestLogin} 
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Tes Kirim Data ke Backend
      </button>
    </div>
  );
}

export default App;