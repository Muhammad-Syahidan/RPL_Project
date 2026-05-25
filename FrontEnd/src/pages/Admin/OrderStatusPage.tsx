import './OrderStatusPage.css';
import { useNavigate } from 'react-router-dom';
import arrowBack from '../../assets/arrow_back.png';
import bgPattern from '../../assets/BgPattern.png';
import cookieDecoration from '../../assets/Cookie Decoration.png';

export default function OrderStatusPage() {
  const navigate = useNavigate();

  const pemesananData = [
    { no: '1', id: '#SHN-001', status: 'Proses' },
  ];

  return (
    <div className="admin-pemesanan-container">
      {/* Background Pattern */}
      <div 
        className="admin-pemesanan-bg-pattern" 
        style={{ backgroundImage: `url(${bgPattern})` }}
      ></div>
      
      {/* Decoration */}
      <img src={cookieDecoration} alt="Cookie Decoration" className="admin-pemesanan-cookie-decoration" />

      <div className="admin-pemesanan-content">
        <h1 className="admin-pemesanan-title">Status Pemesanan</h1>

        <div className="admin-pemesanan-table-wrapper">
          <table className="admin-pemesanan-table">
            <thead>
              <tr>
                <th style={{ width: '15%' }}>No.</th>
                <th style={{ width: '40%' }}>ID Transaksi</th>
                <th style={{ width: '45%' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {pemesananData.map((item, index) => (
                <tr key={index}>
                  <td>{item.no}</td>
                  <td>{item.id}</td>
                  <td>
                    <div className="admin-pemesanan-grid">
                      <div />
                      <span className="admin-pemesanan-status-text">{item.status}</span>
                      <button className="admin-pemesanan-btn-edit">Edit</button>
                      <div />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-pemesanan-back-wrapper">
          <button className="admin-pemesanan-btn-back" onClick={() => navigate(-1)}>
            <img src={arrowBack} alt="Back" style={{ width: '18px' }} /> Kembali
          </button>
        </div>
      </div>
    </div>
  );
}