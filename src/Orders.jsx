import React, { useEffect, useState } from 'react';
import './Cart.css'; // Or a separate CSS file for Orders

function Orders() {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('latestOrder');
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder));
    }
  }, []);

  if (!orderDetails) {
    return <h2>No recent orders found.</h2>;
  }

  return (
    <div className="cart-container">
      <h1>Order Confirmation</h1>
      <h3>Order ID: {orderDetails.OrderId}</h3>
      <h3>Date & Time: {orderDetails.DateTime}</h3>

      <div className="cart-items">
        {orderDetails.items.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.img} alt={item.name} className="cart-image" />
            <div className="cart-details">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Final Paid Amount: ${orderDetails.finalPrice.toFixed(2)}</h2>
    </div>
  );
}

export default Orders;
