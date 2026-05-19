import './OrderStatusPage.css';

// Data pesanan sementara
const orderData = [
  { id: 1, trxId: '#SHN-001', status: 'Proses' },
  // Anda bisa menambahkan data lain di sini nanti
];

export default function OrderStatusPage() {
  
  // Fungsi ketika tombol edit di tabel diklik
  const handleEditStatus = (trxId: string) => {
    console.log(`Buka opsi ubah status untuk transaksi: ${trxId}`);
    // Logika untuk mengubah status (misal memunculkan dropdown atau modal)
  };

  return (
    <div className="status-page-container">
      {/* Latar Belakang Pola */}
      <div className="bg-pattern"></div>
      
      {/* Dekorasi Cookie Kanan Bawah */}
      <div className="decor-cookie-bottom"></div>

      <div className="status-page-content">
        <h1 className="status-page-title">Status Pemesanan</h1>

        {/* Outer Box dengan Border Oranye */}
        <div className="status-table-wrapper">
          <table className="status-table">
            <thead>
              <tr>
                <th className="col-no">No.</th>
                <th className="col-trx">ID Transaksi</th>
                <th className="col-status">Status</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <tr key={order.id}>
                  <td className="text-center">{index + 1}.</td>
                  <td className="text-center font-bold">{order.trxId}</td>
                  <td>
                    <div className="status-cell">
                      <span>{order.status}</span>
                      <button 
                        className="btn-edit-status"
                        onClick={() => handleEditStatus(order.trxId)}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Baris Kosong agar tabel terlihat tinggi (menyesuaikan desain mockup) */}
              {[...Array(8)].map((_, index) => (
                <tr key={`empty-${index}`} className="empty-row">
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tombol Kembali Bawah */}
        <div className="bottom-action">
          <button className="btn-kembali-besar">
            <span>&#8592;</span> Kembali
          </button>
        </div>
      </div>
    </div>
  );
}