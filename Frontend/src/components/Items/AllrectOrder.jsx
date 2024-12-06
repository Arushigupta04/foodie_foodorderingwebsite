// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AllrectOrder = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/orders");
//         const allOrders = response.data;

//         // Filter orders for the past 7 days
//         const sevenDaysAgo = new Date();
//         sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//         const recentOrders = allOrders.filter((order) => {
//           const orderDate = new Date(order.createdAt);
//           return orderDate >= sevenDaysAgo;
//         });

//         // Sort the orders in descending order based on the createdAt field
//         recentOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//         setOrders(recentOrders);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-500 text-xl">Loading orders...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-red-500 text-xl">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Orders from the Past 7 Days</h1>
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {orders.length === 0 ? (
//           <p className="text-center text-gray-500">No orders in the last 7 days.</p>
//         ) : (
//           orders.map((order) => (
//             <div
//               key={order._id}
//               className="border rounded-lg p-4 shadow hover:shadow-lg transition"
//             >
//               <h2 className="text-xl font-semibold mb-2">{order.name}</h2>
//               <p className="text-gray-700">Order ID: {order._id}</p>
//               <p className="text-gray-700">Total: {order.price} Rs</p>
//               <p className="text-gray-700">Quantity: {order.quantity}</p>
//               <p className="text-gray-700">Payment Method: {order.payment_method}</p>
//               <div className="col-auto mt-4">
//                 <a
//                   href={`http://localhost:3000/tracking/${order._id}`}
//                   className="bg-blue-500 text-white px-4 py-2 rounded block text-center"
//                   style={{
//                     fontSize: "18px",
//                     padding: "15px 30px",
//                     width: "200px",
//                     height: "60px",
//                     backgroundColor: "#007bff",
//                     color: "white",
//                     textAlign: "center",
//                     lineHeight: "30px",
//                     display: "block",
//                     borderRadius: "8px",
//                     textDecoration: "none",
//                     transition: "background-color 0.3s ease, transform 0.2s ease",
//                   }}
//                   onMouseOver={(e) => {
//                     e.target.style.backgroundColor = "#0056b3";
//                     e.target.style.transform = "scale(1.05)";
//                   }}
//                   onMouseOut={(e) => {
//                     e.target.style.backgroundColor = "#007bff";
//                     e.target.style.transform = "scale(1)";
//                   }}
//                 >
//                   Track Order
//                 </a>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllrectOrder;
import React, { useEffect, useState } from "react";
import axios from "axios";
import './AllrectOrder.css'; // Importing the new CSS file

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