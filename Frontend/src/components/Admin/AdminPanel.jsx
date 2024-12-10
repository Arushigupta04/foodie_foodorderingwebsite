
// import React, { useState } from "react";

// const AdminPanel = ({ title = "Admin Panel" }) => {
//   const [isPanelVisible, setPanelVisible] = useState(false);

//   const togglePanel = () => {
//     setPanelVisible(!isPanelVisible);
//   };

//   return (
//     <div style={{ display: "flex", overflow: "hidden" }}>
//       {/* Admin Panel */}
//       <div
//         style={{
//           position: "fixed",
//           left: isPanelVisible ? "0" : "-250px",
//           top: "75px",
//           width: "250px",
//           height: "100%",
//           backgroundColor: "rgb(255, 255, 255)",
//           boxShadow: isPanelVisible
//             ? "rgba(0, 0, 0, 0.5) 2px 0px 5px"
//             : "none",
//           color: "#5d0404",
//           padding: "20px",
//           transition: "left 0.3s ease-in-out",
//           zIndex: "999",
//         }}
//       >
//         <h4 style={{ textAlign: "center", marginBottom: "20px" }}>{title}</h4>
//         <ul style={{ listStyle: "none", paddingLeft: "0px", color: "black" }}>
//           <li style={{ margin: "10px 0px" }}>
//             <a
//               href="/admin/add-items"
//               style={{
//                 color: "white",
//                 textDecoration: "none",
//                 padding: "10px 15px",
//                 borderRadius: "5px",
//                 display: "block",
//                 backgroundColor: "#007aff",
//                 transition: "background-color 0.3s, color 0.3s",
//               }}
//             >
//               Add New Items
//             </a>
//           </li>
//           <li style={{ margin: "10px 0px" }}>
//             <a
//               href="/admin/categories"
//               style={{
//                 color: "white",
//                 textDecoration: "none",
//                 padding: "10px 15px",
//                 borderRadius: "5px",
//                 display: "block",
//                 backgroundColor: "#007aff",
//                 transition: "background-color 0.3s, color 0.3s",
//               }}
//             >
//               All Categories Info
//             </a>
//           </li>
//           <li style={{ margin: "10px 0px" }}>
//             <a
//               href="/admin/categories1"
//               style={{
//                 color: "white",
//                 textDecoration: "none",
//                 padding: "10px 15px",
//                 borderRadius: "5px",
//                 display: "block",
//                 backgroundColor: "#007aff",
//                 transition: "background-color 0.3s, color 0.3s",
//               }}
//             >
//               All Items Info
//             </a>
//           </li>
//           <li style={{ margin: "10px 0px" }}>
//             <a
//               href="/admin/alrect"
//               style={{
//                 color: "white",
//                 textDecoration: "none",
//                 padding: "10px 15px",
//                 borderRadius: "5px",
//                 display: "block",
//                 backgroundColor: "#007aff",
//                 transition: "background-color 0.3s, color 0.3s",
//               }}
//             >
//               All Recent Orders
//             </a>
//           </li>
//           <li style={{ margin: "10px 0px" }}>
//             <a
//               href="/admin/alpay"
//               style={{
//                 color: "white",
//                 textDecoration: "none",
//                 padding: "10px 15px",
//                 borderRadius: "5px",
//                 display: "block",
//                 backgroundColor: "#007aff",
//                 transition: "background-color 0.3s, color 0.3s",
//               }}
//             >
//               All Payments
//             </a>
//           </li>
//           <li style={{ margin: "10px 0px" }}>
//             <a
//               href="/admin/review"
//               style={{
//                 color: "white",
//                 textDecoration: "none",
//                 padding: "10px 15px",
//                 borderRadius: "5px",
//                 display: "block",
//                 backgroundColor: "#007aff",
//                 transition: "background-color 0.3s, color 0.3s",
//               }}
//             >
//               All Reviews
//             </a>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div
//         style={{
//           marginLeft: isPanelVisible ? "250px" : "0",
//           transition: "margin-left 0.3s ease-in-out",
//           width: "100%",
//           padding: "0",
//         }}
//       >
//         {/* Hamburger Button */}
//         <button
//           onClick={togglePanel}
//           style={{
//             position: "fixed",
//             top: "75px",
//             left: isPanelVisible ? "250px" : "0px",
//             transform: "translateY(0)",
//             background: "#007aff",
//             border: "none",
//             color: "white",
//             fontSize: "24px",
//             padding: "10px",
//             cursor: "pointer",
//             zIndex: "1000",
//             borderRadius: "0px 5px 5px 0px",
//             transition: "left 0.3s ease-in-out",
//           }}
//         >
//           &#9776;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
import React, { useState } from "react";

const AdminPanel = ({ title = "Admin Panel" }) => {
  const [isPanelVisible, setPanelVisible] = useState(false);

  const togglePanel = () => {
    setPanelVisible(!isPanelVisible);
  };

  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      {/* Admin Panel */}
      <div
        style={{
          position: "fixed",
          left: isPanelVisible ? "0" : "-250px",
          top: "75px",
          width: "250px",
          height: "100%",
          backgroundColor: "rgb(255, 255, 255)",
          boxShadow: isPanelVisible
            ? "rgba(0, 0, 0, 0.5) 2px 0px 5px"
            : "none",
          color: "#5d0404",
          padding: "20px",
          transition: "left 0.3s ease-in-out",
          zIndex: "999",
        }}
      >
        <h4 style={{ textAlign: "center", marginBottom: "20px" }}>{title}</h4>
        <ul style={{ listStyle: "none", paddingLeft: "0px", color: "black" }}>
          <li style={{ margin: "10px 0px" }}>
            <a
              href="/admin"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                display: "block",
                backgroundColor: "#007aff",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              Admin DashBoard
            </a>
          </li>
          <li style={{ margin: "10px 0px" }}>
            <a
              href="/admin/add-items"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                display: "block",
                backgroundColor: "#007aff",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              Add New Items
            </a>
          </li>
          <li style={{ margin: "10px 0px" }}>
            <a
              href="/admin/categories"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                display: "block",
                backgroundColor: "#007aff",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              All Categories Info
            </a>
          </li>
          <li style={{ margin: "10px 0px" }}>
            <a
              href="/admin/categories1"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                display: "block",
                backgroundColor: "#007aff",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              All Items Info
            </a>
          </li>
          <li style={{ margin: "10px 0px" }}>
            <a
              href="/admin/alrect"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                display: "block",
                backgroundColor: "#007aff",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              All Recent Orders
            </a>
          </li>
          <li style={{ margin: "10px 0px" }}>
            <a
              href="/admin/alpay"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                display: "block",
                backgroundColor: "#007aff",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              All Payments
            </a>
          </li>
          <li style={{ margin: "10px 0px" }}>
            <a
              href="/admin/review"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                display: "block",
                backgroundColor: "#007aff",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              All Reviews
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: isPanelVisible ? "250px" : "0",
          transition: "margin-left 0.3s ease-in-out",
          width: "100%",
          padding: "0",
        }}
      >
        {/* Hamburger Button */}
        <button
          onClick={togglePanel}
          style={{
            position: "fixed",
            top: "75px",
            left: isPanelVisible ? "250px" : "0px",
            transform: "translateY(0)",
            background: "#007aff",
            border: "none",
            color: "white",
            fontSize: "24px",
            padding: "10px",
            cursor: "pointer",
            zIndex: "1000",
            borderRadius: "0px 5px 5px 0px",
            transition: "left 0.3s ease-in-out",
          }}
        >
          &#9776;
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
