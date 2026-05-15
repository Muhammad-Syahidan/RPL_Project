import { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardPage.css';

interface Order {
  id: number;
  customer_name: string;
  product_name: string;
  total_price: number;
  status: string;
  created_at: string;
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error("Gagal mengambil data pesanan:", error);
    }
  };

  const handleUpdateStatus = async (id: number, currentStatus: string) => {
    const nextStatus = currentStatus === 'Pending' ? 'Diproses' : 'Selesai';
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, { status: nextStatus });
      fetchOrders(); // Refresh data setelah update
    } catch (error) {
      alert("Gagal memperbarui status");
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Riwayat Pesanan Shan's Cake</h1>
      
      <div className="table-wrapper">
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Pelanggan</th>
              <th>Produk</th>
              <th>Total</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer_name}</td>
                <td>{order.product_name}</td>
                <td>Rp {order.total_price.toLocaleString('id-ID')}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.status !== 'Selesai' && (
                    <button 
                      className="btn-update"
                      onClick={() => handleUpdateStatus(order.id, order.status)}
                    >
                      Lanjutkan Status
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}