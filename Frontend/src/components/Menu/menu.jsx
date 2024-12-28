import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import CategoryMenu from './CategoryMenu';
import { CartContext } from '../Cart/CartContext';
import "./menu.css"
import cartIcon from '../../assets/shopping-cart-icon.svg';

// const serverURL = "http://192.168.54.63:5000"
const serverURL = "https://foodie-foodorderingwebsite.onrender.com";

const MenuPage = () => {
  const [itemCategories, setItemCategories] = useState([]);

  useEffect(() => {
    const fetchItemCategories = async () => {
      try {
        const response = await fetch(`${serverURL}/api/add-new/food-items`);
        setItemCategories(response.data);
      } catch (error) {
        console.error('Error fetching item categories:', error);
      }
    };
  
    fetchItemCategories();
  }, []);
  
  const { cartItems} = useContext(CartContext);

  const size = cartItems.reduce((total, item) => total + item.quantity, 0);


  return (
    <div>
      <CategoryMenu items={itemCategories} />
      <div className='cart-float-div btn-box'>
        <a href="/cart" className='anchorTag'><p className='cart-size-tag'>{size}</p><img src={cartIcon} alt="" className="icon-svg btn-icon cart-float" /></a>
      </div>
    </div>
  );
};

export default MenuPage;
