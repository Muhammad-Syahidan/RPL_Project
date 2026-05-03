import './ReportPage.css';

// Data tiruan (mock data) untuk mengisi tabel
const reportData = [
  { id: 1, namaProduk: "Fudgy Brownies Box - XL", totalBayar: "Rp 82.000", tanggal: "03 Mei 2026", status: "Selesai" },
  { id: 2, namaProduk: "Mini Cake", totalBayar: "Rp 35.000", tanggal: "03 Mei 2026", status: "Selesai" },
  { id: 3, namaProduk: "Matcha Cookies (x2)", totalBayar: "Rp 14.000", tanggal: "02 Mei 2026", status: "Selesai" },
  { id: 4, namaProduk: "Oreo Cookies", totalBayar: "Rp 6.000", tanggal: "01 Mei 2026", status: "Selesai" },
];

export default function ReportPage() {
  
  // Fungsi untuk memicu fitur print dari browser
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="report-page-container">
      {/* Latar Belakang Pola */}
      <div className="bg-pattern"></div>
      
      {/* Dekorasi Cookie Kanan Bawah */}
      <div className="decor-cookie-bottom"></div>

      <div className="report-page-content">
        <h1 className="report-page-title">Shan's Laporan</h1>

        {/* Tabel Laporan */}
        <div className="table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th className="col-no">No.</th>
                <th className="col-nama">Nama Produk</th>
                <th className="col-total">Total Bayar</th>
                <th className="col-tanggal">Tanggal</th>
                <th className="col-status">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Me-render data pesanan */}
              {reportData.map((data, index) => (
                <tr key={data.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data.namaProduk}</td>
                  <td>{data.totalBayar}</td>
                  <td>{data.tanggal}</td>
                  <td className="text-center">{data.status}</td>
                </tr>
              ))}
              
              {/* Menambahkan baris kosong agar tabel terlihat tinggi (seperti di mockup) */}
              {[...Array(6)].map((_, index) => (
                <tr key={`empty-${index}`} className="empty-row">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tombol Aksi Bawah */}
        <div className="bottom-actions">
          <button className="btn-action">
            <span>&#8592;</span> Kembali
          </button>
          <button className="btn-action" onClick={handlePrint}>
            Cetak Laporan
          </button>
        </div>
      </div>
    </div>
  );
}