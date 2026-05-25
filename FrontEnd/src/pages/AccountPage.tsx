import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountPage.css';
import chocoDrip from '../assets/ChocoDrip.png';
import editIcon from '../assets/edit.png';
import arrowBack from '../assets/arrow_back.png';

const AccountPage = () => {
  const navigate = useNavigate();

  return (
    <div className="account-container">
      <div className="account-bg-pattern" />
      <img src={chocoDrip} alt="Choco Drip" className="deco-drip" />
      
      <div className="account-content">
        <h1 className="acc-title">Account</h1>

        <div className="profile-section">
          {[
            { label: 'Username', value: 'Windah' },
            { label: 'Email', value: 'Windah@gmail.com' },
            { label: 'No. Hp', value: '+62 812-4547-2353' },
          ].map((item) => (
            <div className="field-group" key={item.label}>
              <span className="label-text">{item.label} :</span>
              <div className="input-box">
                <input type="text" defaultValue={item.value} readOnly />
                <img src={editIcon} alt="Edit" className="edit-icon" />
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />
        <h3 className="orders-header">Pesanan Saya :</h3>
        <div className="orders-container">
          {[
            { title: 'Fudgy Brownies Box - XL (20x20)', qty: 'x1', topping: 'Rp 5.000', total: 'Rp 87.000', status: 'Diproses' },
            { title: 'Chocolate Cookies', qty: 'x3', topping: 'Rp 3.000', total: 'Rp 21.000', status: 'Selesai' }
          ].map((order, i) => (
            <div className="order-card" key={i}>
              <div className="order-img" />
              <div className="order-info">
                <div className="order-title-row">
                  <div className="order-title">{order.title}</div>
                  <div className="order-qty">{order.qty}</div>
                </div>
                <div className="order-detail">Add Toppings : {order.topping}</div>
                <div className="order-detail">Total 1 Produk : {order.total}</div>
                <div className="order-status">Status : {order.status}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="btn-group">
          <button className="btn-action" onClick={() => navigate('/')}>Logout</button>
          <button className="btn-action back-btn" onClick={() => navigate('/home')}>
            <img src={arrowBack} alt="Back" className="back-icon" /> Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;