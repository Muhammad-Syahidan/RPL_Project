import './ReportPage.css';
import { useNavigate } from 'react-router-dom';
import cookieImg from '../../assets/Cookie Decoration.png'; 
import backIcon from '../../assets/arrow_back.png';

const reportData = [
  { id: 1, namaProduk: "Fudgy Brownies Box - XL", totalBayar: "Rp 82.000", tanggal: "03 Mei 2026", status: "Selesai" },
  { id: 2, namaProduk: "Mini Cake", totalBayar: "Rp 35.000", tanggal: "03 Mei 2026", status: "Selesai" },
  { id: 3, namaProduk: "Matcha Cookies (x2)", totalBayar: "Rp 14.000", tanggal: "02 Mei 2026", status: "Selesai" },
  { id: 4, namaProduk: "Oreo Cookies", totalBayar: "Rp 6.000", tanggal: "01 Mei 2026", status: "Selesai" },
];

export default function AdminReport() {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="admin-report-container">
      <div className="admin-report-bg-pattern"></div>
      
      <img src={cookieImg} alt="Cookie Decoration" className="admin-report-cookie-decoration" />

      <div className="admin-report-content">
        <h1 className="admin-report-title">Shan's Laporan</h1>

        <div className="admin-report-table-wrapper">
          <table className="admin-report-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama Produk</th>
                <th>Total Bayar</th>
                <th>Tanggal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.namaProduk}</td>
                  <td>{data.totalBayar}</td>
                  <td>{data.tanggal}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
              {[...Array(6)].map((_, index) => (
                <tr key={`empty-${index}`}>
                  <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-report-bottom-actions">
          <button className="admin-report-btn-action" onClick={() => navigate('/admin/dashboard')}>
            <img src={backIcon} alt="Back" className="admin-report-back-icon" />
            Kembali
          </button>
          <button className="admin-report-btn-action" onClick={handlePrint}>
            Cetak Laporan
          </button>
        </div>
      </div>
    </div>
  );
}