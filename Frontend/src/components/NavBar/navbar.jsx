
// import React, { useState,useContext } from 'react';
// import './Navbar.css'; // Import CSS file
// import icon from '../../assets/icon.svg';
// import locationIcon from '../../assets/location.svg';
// import searchIcon from '../../assets/icons8-search-50.svg';
// import discountIcon from '../../assets/discount.svg';
// import cartIcon from '../../assets/shopping-cart-icon.svg';
// import signInIcon from '../../assets/sign-in.svg';
// import { useUser } from '../userContext';
// import { useCookies } from 'react-cookie';
// import { CartContext } from '../Cart/CartContext';
// import AboutIcon from "../../assets/icons8-about.svg"

// function Navbar() {
//   const { user, updateUser } = useUser();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [cookies, setCookie, removeCookie] = useCookies(['token', 'cartItems']);
//   const { clearCart, cartItems } = useContext(CartContext); 

//   const size = cartItems.reduce((total, item) => total + item.quantity, 0);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const handleSignOut = () => {
//     removeCookie('token', { path: '/' });
//     localStorage.removeItem('token');
//     updateUser(null);
    
//     clearCart();
//     removeCookie('cartItems', { path: '/' });

//     window.location.reload();
//   };

//   return (
//     <header className="top-nav">
//       <div className="small-device-menu">
//         <div className="menu-top">
//           <div className={`menu-icon-box ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
//             <label className={`menu-line menu-line1 ${menuOpen ? 'menu-close1' : ''}`}></label>
//             <label className={`menu-line menu-line2 ${menuOpen ? 'menu-close2' : ''}`}></label>
//             <label className={`menu-line menu-line3 ${menuOpen ? 'menu-close3' : ''}`}></label>
//           </div>
//           <a href="/"><img className="icon-img" src={icon} alt="" /></a>
//         </div>
//         <div className={`menu-content ${menuOpen ? 'active' : ''}`}>
//           <div className="menu-ol">
//             <ul className="menu-items">
//               <li className="home-mobile"><a href="/">Home</a></li>
//               <li className="home-mobile"><a href="/menu">Menu</a></li>
//               {user ? (
//                 <>
//                   {user.role === "Admin" ? <li className="sign-in-mobile"><a href="/admin">Admin</a></li> 
//                     : <li className="sign-in-mobile"><a href="/profile">Profile</a></li> 
//                   }
//                    <li className="sign-out" onClick={handleSignOut}><a >Sign Out</a></li>
//                 </>
//               ) : (
//                 <>
//                   <li className="sign-in-mobile"><a href="/sign-in">Sign In</a></li>
//                   <li className="sign-in-mobile"><a href="/sign-up">Sign Up</a></li>
//                 </>
//               )}
//               <li><a href="#">Contact Us</a></li>
//               <li><a href="/about-us">About Us</a></li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       <div className="top-nav-box">
//         <div className="top-nav-box1">
//           <div className="icon">
//             <a href="/"><img src={icon} className="icon-img" alt="" /></a>
//           </div>
//           <div className="search-bar">
//             <div className="location-search search-box">
//               <input type="search" className="search location-search-input" name="location-search" placeholder="Jaipur" />
//               <img src={locationIcon} alt="" className="search-icon icon-svg" />
//             </div>
//             <div className="food-search search-box">
//               <input type="search" className="search search-input" name="search-bar" placeholder="Hungry !" />
//               <img src={searchIcon} alt="" className="search-icon icon-svg" />
//             </div>
//           </div>
//         </div>
//         <div className="nav-right-menu">
//         <div className="shopping-cart-box btn-box border-right">
//             <a href="/about-us" className='anchorTag'><img src={AboutIcon} alt="" className="icon-svg btn-icon" />
//               <p>About</p></a>
//           </div>
//           <div className="discount-box btn-box border-right">
//             <a href="/menu" className='anchorTag'><img src={discountIcon} alt="" className="icon-svg btn-icon" />
//               <p>Menu</p></a>
//           </div>
//           <div className="shopping-cart-box btn-box border-right shopping-cart-box-float">
//             <a href="/cart" className='anchorTag'><img src={cartIcon} alt="" className="icon-svg btn-icon" />
//             <p className='cart-text'>{size}</p>
//               <p>Cart</p></a>
//           </div>
//           <div className="sign-in-box btn-box">
//             {user ? (
//               <div className="user-info">
//                 <div className="dropdown">
//                   <button className="dropdown-toggle" type="button" aria-haspopup="true" aria-expanded={menuOpen ? 'true' : 'false'} onClick={toggleMenu}>
//                     <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Icon" className="round-icon" />
//                   </button>
//                   <div className={`dropdown-menu ${menuOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
//                     <a className="dropdown-item" href="#">Welcome, {user.fullName.split(" ")[0]}</a>
//                     {user.role === "Admin" ? <a className="dropdown-item" href="/admin">Go to Admin</a>
//                     : <a className="dropdown-item" href="/profile">Go to Profile</a>  
//                   }
//                     <a className="dropdown-item" onClick={handleSignOut}>Sign Out</a>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <a href="/sign-in" className='anchorTag'><img src={signInIcon} alt="" className="icon-svg btn-icon" />
//                 <p>Sign In</p></a>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Navbar;


import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./Navbar.css";
import icon from "../../assets/icon.svg";
import locationIcon from "../../assets/location.svg";
import searchIcon from "../../assets/icons8-search-50.svg";
import discountIcon from "../../assets/discount.svg";
import cartIcon from "../../assets/shopping-cart-icon.svg";
import signInIcon from "../../assets/sign-in.svg";
import { useUser } from "../userContext";
import { useCookies } from "react-cookie";
import { CartContext } from "../Cart/CartContext";
import AboutIcon from "../../assets/icons8-about.svg";
import axios from "axios";

function Navbar() {
  const { user, updateUser } = useUser();
  const location = useLocation(); // Get current route
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationState, setLocationState] = useState("Fetching location...");
  const [cookies, setCookie, removeCookie] = useCookies(["token", "cartItems"]);
  const { clearCart, cartItems } = useContext(CartContext);

  const size = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = () => {
    removeCookie("token", { path: "/" });
    updateUser(null);

    clearCart();
    removeCookie("cartItems", { path: "/" });

    window.location.reload();
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          axios
            .get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=16c8d38df3594b0c9967f715199f580b`
            )
            .then((response) => {
              const city =
                response.data.results[0]?.components._normalized_city || "Unknown Location";
              setLocationState(city);
            })
            .catch((error) => {
              console.error("Error fetching geolocation", error);
              setLocationState("Unable to fetch location");
            });
        },
        () => {
          setLocationState("Location permission denied");
        }
      );
    } else {
      setLocationState("Geolocation not supported");
    }
  };


  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
    {menuOpen && (
        <div
          className="overlay"
          onClick={toggleMenu} // Close the menu when overlay is clicked
        ></div>
      )}
    <header className="top-nav">
      <div className="small-device-menu">
        <div className="menu-top">
          <div
            className={`menu-icon-box ${menuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <label
              className={`menu-line menu-line1 ${
                menuOpen ? "menu-close1" : ""
              }`}
            ></label>
            <label
              className={`menu-line menu-line2 ${
                menuOpen ? "menu-close2" : ""
              }`}
            ></label>
            <label
              className={`menu-line menu-line3 ${
                menuOpen ? "menu-close3" : ""
              }`}
            ></label>
          </div>
          <a href="/">
            <img className="icon-img" src={icon} alt="App Icon" />
          </a>
        </div>
        <div className={`menu-content ${menuOpen ? "active" : ""}`}>
          <div className="menu-ol">
            <ul className="menu-items">
              <li className="home-mobile">
                <a href="/">Home</a>
              </li>
              <li className="home-mobile">
                <a href="/menu">Menu</a>
              </li>
              {user ? (
                <>
                  {user.role === "Admin" ? (
                    <li className="sign-in-mobile">
                      <a href="/admin">Admin</a>
                    </li>
                  ) : (
                    <li className="sign-in-mobile">
                      <a href="/profile">Profile</a>
                    </li>
                  )}
                  <li className="sign-out">
                    <a onClick={handleSignOut} className="sign-out">
                      Sign Out
                    </a>
                  </li>
                </>
              ) : (
                <>
                  {location.pathname === "/sign-in" ? (
                    <li className="sign-in-mobile">
                      <a href="/sign-up">Sign Up</a>
                    </li>
                  ) : (
                    <li className="sign-in-mobile">
                      <a href="/sign-in">Sign In</a>
                    </li>
                  )}
                </>
              )}
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="/about-us">About Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="top-nav-box">
        <div className="top-nav-box1">
          <div className="icon">
            <a href="/">
              <img src={icon} className="icon-img" alt="App Icon" />
            </a>
          </div>
          <div className="search-bar">
            <div className="location-search search-box">
              <div className="location-search-input">
                <img
                  src={locationIcon}
                  alt="Location Icon"
                  className="search-icon1 icon-svg"
                />
                {locationState}
              </div>
            </div>
          </div>
        </div>
        <div className="nav-right-menu">
          <div className="shopping-cart-box btn-box border-right">
            <a href="/about-us" className="anchorTag">
              <img
                src={AboutIcon}
                alt="About Icon"
                className="icon-svg btn-icon"
              />
              <p>About</p>
            </a>
          </div>
          <div className="discount-box btn-box border-right">
            <a href="/menu" className="anchorTag">
              <img
                src={discountIcon}
                alt="Discount Icon"
                className="icon-svg btn-icon"
              />
              <p>Menu</p>
            </a>
          </div>
          <div className="shopping-cart-box btn-box border-right shopping-cart-box-float">
            <a href="/cart" className="anchorTag">
              <img
                src={cartIcon}
                alt="Cart Icon"
                className="icon-svg btn-icon"
              />
              <p className="cart-text">{size}</p>
              <p>Cart</p>
            </a>
          </div>
          <div className="sign-in-box btn-box">
            {user ? (
              <div className="user-info">
                <div className="dropdown">
                  <button
                    className="dropdown-toggle"
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={menuOpen ? "true" : "false"}
                    onClick={toggleMenu}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="User Icon"
                      className="round-icon"
                    />
                  </button>
                  <div
                    className={`dropdown-menu ${menuOpen ? "show" : ""}`}
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="#">
                      Welcome, {user.fullName.split(" ")[0]}
                    </a>
                    {user.role === "Admin" ? (
                      <a className="dropdown-item" href="/admin">
                        Go to Admin
                      </a>
                    ) : (
                      <a className="dropdown-item" href="/profile">
                        Go to Profile
                      </a>
                    )}
                    <a className="dropdown-item" onClick={handleSignOut}>
                      Sign Out
                    </a>
                  </div>
                </div>
              </div>
            ) : location.pathname === "/sign-in" ? (
              <a href="/sign-up" className="anchorTag">
                <img
                  src={signInIcon}
                  alt="Sign Up Icon"
                  className="icon-svg btn-icon"
                />
                <p>Sign Up</p>
              </a>
            ) : (
              <a href="/sign-in" className="anchorTag">
                <img
                  src={signInIcon}
                  alt="Sign In Icon"
                  className="icon-svg btn-icon"
                />
                <p>Sign In</p>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
    </>
  );
}

export default Navbar;
