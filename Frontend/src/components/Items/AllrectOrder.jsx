import React, { useEffect, useState } from "react";
import axios from "axios";
import './AllrectOrder.css'; // Importing the new CSS file
import AdminPanel from "../Admin/AdminPanel";

const AllrectOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        const allOrders = response.data;

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentOrders = allOrders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= sevenDaysAgo;
        });

        // Sort orders by most recent first
        recentOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setOrders(recentOrders);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="gradient-background">
      <div
                style={{ flex: "0 0 auto", backgroundColor: "#343a40" }}
              >
                <AdminPanel />
              </div>
      <div className="order-container">
        <div className="order-card">
          <h1 className="order-title">Recent Orders</h1>
          {orders.length === 0 ? (
            <p className="no-orders">No recent orders found.</p>
          ) : (
            <div className="table-wrapper">
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Name</th>
                    <th>Total (Rs)</th>
                    <th>Quantity</th>
                    <th>Payment Method</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order._id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                      <td>{order._id}</td>
                      <td>{order.name}</td>
                      <td>{order.price}</td>
                      <td>{order.quantity}</td>
                      <td>{order.payment_method}</td>
                      <td>
                        <a 
                          href={`http://localhost:3000/tracking/${order._id}`} 
                          className="track-button" 
                          aria-label={`Track order for ${order.name}`}>
                          Track Order
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllrectOrder;