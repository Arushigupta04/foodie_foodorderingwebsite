// import React, { useState, useEffect, useContext } from 'react';
// import './style.css';
// import { useCookies } from 'react-cookie';
// import { CartContext } from '../Cart/CartContext';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const serverURL = "http://localhost:5000";

// function UserProfile() {
//   const [user, setUser] = useState({
//     fullName: '',
//     email: '',
//     mobile: '',
//     role: '',
//     RecentOrders: [],
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [updatedUserInfo, setUpdatedUserInfo] = useState({
//     _id: '',
//     fullName: '',
//     email: '',
//     mobile: '',
//   });

//   const [errors, setErrors] = useState({
//     email: '',
//     mobile: '',
//   });

//   const [cookies, setCookie, removeCookie] = useCookies(['token']);
//   const { clearCart } = useContext(CartContext);

//   const fetchUserData = async () => {
//     try {
//       const token = cookies.token;
//       if (!token) {
//         console.error('Token not found in cookies');
//         return;
//       }

//       const response = await fetch(`${serverURL}/api/user`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         const sortedOrders = userData.RecentOrders.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setUser({ ...userData, RecentOrders: sortedOrders });
//         setUpdatedUserInfo({
//           _id: userData._id,
//           fullName: userData.fullName,
//           email: userData.email,
//           mobile: userData.mobile,
//         });
//       } else {
//         console.error('Failed to fetch user data');
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const handleEdit = () => {
//     setEditMode(true);
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email) ? '' : 'Invalid email format';
//   };

//   const validateMobile = (mobile) => {
//     const mobileRegex = /^[6-9]\d{9}$/;
//     return mobileRegex.test(mobile)
//       ? ''
//       : 'Invalid mobile number (must start with 6-9 and have 10 digits)';
//   };

//   const validateName = (name) => {
//     if (name.length < 3) {
//       return 'Name must be at least 3 characters long';
//     }
//     if (name.length > 30) {
//       return 'Name must be no longer than 30 characters';
//     }
//     return ''; // No error
//   };
  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedUserInfo({
//       ...updatedUserInfo,
//       [name]: value,
//     });
  
//     if (name === 'email') {
//       setErrors({ ...errors, email: validateEmail(value) });
//     } else if (name === 'mobile') {
//       setErrors({ ...errors, mobile: validateMobile(value) });
//     } else if (name === 'fullName') {
//       setErrors({ ...errors, fullName: validateName(value) });
//     }
//   };
  

//   const handleSave = async () => {
//     if (errors.email || errors.mobile) {
//       return;
//     }

//     try {
//       const token = cookies.token;
//       if (!token) {
//         console.error('Token not found in cookies');
//         return;
//       }

//       const response = await fetch(`${serverURL}/api/user/update`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedUserInfo),
//       });

//       if (response.ok) {
//         setEditMode(false);
//         fetchUserData();
//         window.location.reload();
//       } else {
//         console.error('Failed to update user information');
//       }
//     } catch (error) {
//       console.error('Error updating user information:', error);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     try {
//       const token = cookies.token;
//       if (!token) {
//         console.error('Token not found in cookies');
//         return;
//       }

//       const response = await fetch(`${serverURL}/api/user/delete`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         removeCookie('token');
//         removeCookie('cartItems', { path: '/' });
//         clearCart();
//         toast.success('Account deleted successfully!');
//         setTimeout(() => {
//           window.location.href = '/';
//         }, 2000);
//       } else {
//         console.error('Failed to delete user account');
//       }
//     } catch (error) {
//       console.error('Error deleting user account:', error);
//     }
//   };

//   if (!cookies.token) {
//     return (
//       <div className="access-forbidden">
//         <h3>Access Forbidden</h3>
//         <p>Please log in to access this page.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="card user-card-full col-xl-8" style={{ margin: '40px auto' }}>
//       <div className="row m-l-0 m-r-0">
//         <div className="col-sm-4 bg-c-lite-green user-profile">
//           <div className="card-block text-center text-white">
//             <div className="m-b-25">
//               <img
//                 src="https://img.icons8.com/bubbles/100/000000/user.png"
//                 className="img-radius"
//                 alt="User Profile"
//               />
//             </div>
//             <h6 className="f-w-600">{user.role}</h6>
//             {editMode ? (
//   <div>
//     <input
//       type="text"
//       className="form-control"
//       name="fullName"
//       placeholder="Full Name"
//       value={updatedUserInfo.fullName}
//       onChange={handleInputChange}
//     />
//     {errors.fullName && <p className="text-white">{errors.fullName}</p>}
//     <input
//       type="email"
//       className="form-control mt-3"
//       name="email"
//       placeholder="Email"
//       value={updatedUserInfo.email}
//       onChange={handleInputChange}
//     />
//     {errors.email && <p className="text-white">{errors.email}</p>}
//     <input
//       type="text"
//       className="form-control mt-3"
//       name="mobile"
//       placeholder="Mobile"
//       value={updatedUserInfo.mobile}
//       onChange={handleInputChange}
//     />
//     {errors.mobile && <p className="text-white">{errors.mobile}</p>}
//   </div>
// ) : (
//   <div>
//     <p>{user.fullName}</p>
//     <p>{user.email}</p>
//     <p>{user.mobile}</p>
//   </div>
// )}

//             <button
//               className="btn btn-light mt-3"
//               onClick={editMode ? handleSave : handleEdit}
//               disabled={editMode && (errors.email || errors.mobile)}
//             >
//               {editMode ? 'Save' : 'Edit'}
//             </button>
//           </div>
//         </div>
//         <div className="col-sm-8">
//           <div className="card-block">
//             <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
//             <button type="button" className="btn btn-danger mt-5" onClick={handleDeleteAccount}>
//               Delete Account
//             </button>
//             <h6 className="text-muted mt-5">Recent Orders</h6>
//             {user.RecentOrders.length === 0 ? (
//               <p>No Recent Orders</p>
//             ) : (
//               user.RecentOrders.map((order, index) => (
//                 <div className="card mb-3" key={index}>
//                   <div className="row no-gutters">
//                     <div className="col-md-4" style={{ alignSelf: 'center' }}>
//                       {order.image ? (
//                         <img src={order.image} className="card-img" alt="Product" />
//                       ) : (
//                         <p>No Image Available</p>
//                       )}
//                     </div>
//                     <div className="col-md-8">
//                       <div className="card-body">
//                         <h5 className="card-title">{order.name}</h5>
//                         <div className="text-container">
//                           <h6>Price:</h6>
//                           <p>&nbsp;&nbsp;₹{order.price}</p>
//                         </div>
//                         <div className="text-container">
//                           <h6>Ordered At:</h6>
//                           <p>&nbsp;&nbsp;{order.createdAt}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;
import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { useCookies } from 'react-cookie';
import { CartContext } from '../Cart/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serverURL = "http://localhost:5000";

function UserProfile() {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    mobile: '',
    role: '',
    RecentOrders: [],
  });

  const [editMode, setEditMode] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    _id: '',
    fullName: '',
    email: '',
    mobile: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    mobile: '',
  });

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const { clearCart } = useContext(CartContext);

  const fetchUserData = async () => {
    try {
      const token = cookies.token;
      if (!token) {
        console.error('Token not found in cookies');
        return;
      }

      const response = await fetch(`${serverURL}/api/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        const sortedOrders = userData.RecentOrders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setUser({ ...userData, RecentOrders: sortedOrders });
        setUpdatedUserInfo({
          _id: userData._id,
          fullName: userData.fullName,
          email: userData.email,
          mobile: userData.mobile,
        });
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'Invalid email format';
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile)
      ? ''
      : 'Invalid mobile number (must start with 6-9 and have 10 digits)';
  };

  const validateName = (name) => {
    if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    }
    if (name.length > 30) {
      return 'Name must be no longer than 30 characters';
    }
    return ''; // No error
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserInfo({
      ...updatedUserInfo,
      [name]: value,
    });
  
    if (name === 'email') {
      setErrors({ ...errors, email: validateEmail(value) });
    } else if (name === 'mobile') {
      setErrors({ ...errors, mobile: validateMobile(value) });
    } else if (name === 'fullName') {
      setErrors({ ...errors, fullName: validateName(value) });
    }
  };
  

  const handleSave = async () => {
    if (errors.email || errors.mobile) {
      return;
    }

    try {
      const token = cookies.token;
      if (!token) {
        console.error('Token not found in cookies');
        return;
      }

      const response = await fetch(`${serverURL}/api/user/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserInfo),
      });

      if (response.ok) {
        setEditMode(false);
        fetchUserData();
        window.location.reload();
      } else {
        console.error('Failed to update user information');
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = cookies.token;
      if (!token) {
        console.error('Token not found in cookies');
        return;
      }

      const response = await fetch(`${serverURL}/api/user/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        removeCookie('token');
        removeCookie('cartItems', { path: '/' });
        clearCart();
        toast.success('Account deleted successfully!');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        console.error('Failed to delete user account');
      }
    } catch (error) {
      console.error('Error deleting user account:', error);
    }
  };

  if (!cookies.token) {
    return (
      <div className="access-forbidden">
        <h3>Access Forbidden</h3>
        <p>Please log in to access this page.</p>
      </div>
    );
  }

  return (
    <div className="card user-card-full col-xl-8" style={{ margin: '40px auto' }}>
      <div className="row m-l-0 m-r-0">
        <div className="col-sm-4 bg-c-lite-green user-profile">
          <div className="card-block text-center text-white">
            <div className="m-b-25">
              <img
                src="https://img.icons8.com/bubbles/100/000000/user.png"
                className="img-radius"
                alt="User Profile"
              />
            </div>
            <h6 className="f-w-600">{user.role}</h6>
            {editMode ? (
  <div>
    <input
      type="text"
      className="form-control"
      name="fullName"
      placeholder="Full Name"
      value={updatedUserInfo.fullName}
      onChange={handleInputChange} 
    />
    {errors.fullName && <p className="text-white">{errors.fullName}</p>}
    <input
      type="email"
      className="form-control mt-3"
      name="email"
      placeholder="Email"
      value={updatedUserInfo.email}
      onChange={handleInputChange}
    />
    {errors.email && <p className="text-white">{errors.email}</p>}
    <input
      type="text"
      className="form-control mt-3"
      name="mobile"
      placeholder="Mobile"
      value={updatedUserInfo.mobile}
      onChange={handleInputChange}
    />
    {errors.mobile && <p className="text-white">{errors.mobile}</p>}
  </div>
) : (
  <div>
    <p>{user.fullName}</p>
    <p>{user.email}</p>
    <p>{user.mobile}</p>
  </div>
)}

            <button
              className="btn btn-light mt-3"
              onClick={editMode ? handleSave : handleEdit}
              disabled={editMode && (errors.email || errors.mobile)}
            >
              {editMode ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="card-block">
            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
            <button type="button" className="btn btn-danger mt-5" onClick={handleDeleteAccount}>
              Delete Account
            </button>
            <h6 className="text-muted mt-5">Recent Orders</h6>
            {user.RecentOrders.length === 0 ? (
              <p>No Recent Orders</p>
            ) : (
              user.RecentOrders.map((order, index) => (
                <div className="card mb-3" key={index}>
                  <div className="row no-gutters">
                    <div className="col-md-4" style={{ alignSelf: 'center' }}>
                      {order.image ? (
                        <img src={order.image} className="card-img" alt="Product" />
                      ) : (
                        <p>No Image Available</p>
                      )}
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{order.name}</h5>
                        <div className="text-container">
                          <h6>Price:</h6>
                          <p>&nbsp;&nbsp;₹{order.price}</p>
                        </div>
                        <div className="text-container">
                          <h6>Ordered At:</h6>
                          <p>&nbsp;&nbsp;{order.createdAt}</p>
                        </div>
                        <div className="col-auto mt-4">
                <a
                  href={`http://localhost:3000/tracking/${order._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded block text-center"
                  style={{
                    fontSize: "20px",
                    padding: "13px 20px",
                    width: "170px",
                    height: "50px",
                    backgroundColor: "#007bff",
                    color: "white",
                    textAlign: "center",
                    lineHeight: "30px",
                    display: "block",
                    borderRadius: "8px",
                    textDecoration: "none",
                    transition: "background-color 0.3s ease, transform 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#0056b3";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#007bff";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  Track Order
                </a>
              </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;