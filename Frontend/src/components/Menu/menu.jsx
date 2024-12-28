// import React, { useState, useEffect,useContext } from 'react';
// import axios from 'axios';
// import CategoryMenu from './CategoryMenu';
// import { CartContext } from '../Cart/CartContext';
// import "./menu.css"
// import cartIcon from '../../assets/shopping-cart-icon.svg';

// // const serverURL = "http://192.168.54.63:5000"
// const serverURL = "https://foodie-foodorderingwebsite.onrender.com";

// const MenuPage = () => {
//   const [itemCategories, setItemCategories] = useState([]);

//   useEffect(() => {
//     const fetchItemCategories = async () => {
//       try {
//         const response = await fetch(`${serverURL}/api/add-new/food-items`);
//         const data = await response.json();
// setItemCategories(data);
//       } catch (error) {
//         console.error('Error fetching item categories:', error);
//       }
//     };
  
//     fetchItemCategories();
//   }, []);
  
//   const { cartItems} = useContext(CartContext);

//   const size = cartItems.reduce((total, item) => total + item.quantity, 0);


//   return (
//     <div>
//       <CategoryMenu items={itemCategories} />
//       <div className='cart-float-div btn-box'>
//         <a href="/cart" className='anchorTag'><p className='cart-size-tag'>{size}</p><img src={cartIcon} alt="" className="icon-svg btn-icon cart-float" /></a>
//       </div>
//     </div>
//   );
// };

// export default MenuPage;
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CategoryMenu from './CategoryMenu';
import { CartContext } from '../Cart/CartContext';
import "./menu.css";
import cartIcon from '../../assets/shopping-cart-icon.svg';

const serverURL = "https://foodie-foodorderingwebsite.onrender.com";

const MenuPage = () => {
  const [itemCategories, setItemCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemCategories = async () => {
      try {
        console.log('Fetching item categories...');
        const response = await axios.get(`${serverURL}/api/add-new/food-items`);
        console.log('Response data:', response.data);
        setItemCategories(response.data);
      } catch (err) {
        console.error('Error fetching item categories:', err);
        setError('Failed to fetch item categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItemCategories();
  }, []);

  const { cartItems } = useContext(CartContext);
  const size = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <CategoryMenu items={itemCategories} />}
      <div className='cart-float-div btn-box'>
        <a href="/cart" className='anchorTag'>
          <p className='cart-size-tag'>{size}</p>
          <img src={cartIcon} alt="Cart Icon" className="icon-svg btn-icon cart-float" />
        </a>
      </div>
    </div>
  );
};

export default MenuPage;
