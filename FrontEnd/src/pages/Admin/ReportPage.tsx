import { useState, useEffect } from 'react';
import './ReportPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cookieImg from '../../assets/Cookie Decoration.png'; 
import backIcon from '../../assets/arrow_back.png';

export default function ReportPage() {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState<any[]>([]);
  
  // State untuk filter tanggal
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fungsi fetch data dengan parameter filter
  const fetchData = async (start?: string, end?: string) => {
    try {
      const response = await axios.get('http://localhost:5000/api/laporan', {
        params: { startDate: start, endDate: end }
      });
      setReportData(response.data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    }
  };

  useEffect(() => {
    // Reset filter otomatis saat komponen dimuat
    setStartDate('');
    setEndDate('');
    fetchData();
  }, []);

  const handlePrint = () => window.print();

  return (
    <div className="admin-report-container">
      <div className="admin-report-bg-pattern"></div>
      <img src={cookieImg} alt="Decoration" className="admin-report-cookie-decoration" />

      <div className="admin-report-content">
        <h1 className="admin-report-title">Shan's Laporan</h1>

        {/* Filter Tanggal */}
        <div style={{ marginBottom: '30px', display: 'flex', gap: '15px', justifyContent: 'center', alignItems: 'center' }}>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
            style={{ padding: '10px', borderRadius: '15px', border: '2px solid #4A2E1B' }}
          />
          <span>s/d</span>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)}
            style={{ padding: '10px', borderRadius: '15px', border: '2px solid #4A2E1B' }}
          />
          <button 
            className="admin-report-btn-action" 
            style={{ padding: '10px 30px' }} 
            onClick={() => fetchData(startDate, endDate)}
          >
            Filter
          </button>
        </div>

        <div className="admin-report-table-wrapper">
          <table className="admin-report-table">
            <thead>
              <tr>
                <th>No.</th><th>Nama Produk</th><th>Total Bayar</th><th>Tanggal</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData.length > 0 ? (
                reportData.map((data, index) => (
                  <tr key={data.id_transaksi}>
                    <td>{index + 1}</td>
                    <td>{data.namaProduk}</td>
                    <td>Rp {Number(data.total_bayar).toLocaleString('id-ID')}</td>
                    <td>{new Date(data.tanggal).toLocaleDateString('id-ID')}</td>
                    <td>{data.status}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} style={{textAlign: 'center'}}>Data tidak tersedia</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-report-bottom-actions">
          <button className="admin-report-btn-action" onClick={() => navigate('/admin/dashboard')}>
            <img src={backIcon} alt="Back" className="admin-report-back-icon" /> Kembali
          </button>
          <button className="admin-report-btn-action" onClick={handlePrint}>Cetak Laporan</button>
        </div>
      </div>
    </div>
  );
}