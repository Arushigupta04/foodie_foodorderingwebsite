import React, { useContext, useState } from 'react';
import { CartContext } from '../Cart/CartContext';
import Checkout from './Checkout';
import OrderConfirmation from './Orderconfirm';
import "./style.css";

// Import the image at the top
import cartBanner from '../../assets/category-images/cart.png';

const serverURL = "https://foodie-foodorderingwebsite.onrender.com";

const ShoppingCart = () => {
  const { cartItems, clearCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]);
  const [orderId, setOrderId] = useState('');

  const handleGoToCheckout = () => {
    setShowCheckout(true);
  };


  const handlePayment = async ({ address, paymentMethod, email }) => { // Include email in the parameters
    const orderData = cartItems.map((item) => ({
      name: item.item_title,
      price: item.item_price,
      delivery_address: address,
      quantity: item.quantity,
      image: item.item_src,
      payment_method: paymentMethod, 
      email: email, // Add email to the order data
    }));
  
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
      const orderPromises = orderData.map(async (item) => {
        const response = await fetch(`${serverURL}/api/user/add-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(item),
        });
        const data = await response.json();
        return data.order._id;
      });
  
      const orderIds = await Promise.all(orderPromises);
  
      setOrderedItems([...cartItems]);
      setOrderId(orderIds.join(', '));
  
      setTimeout(() => {
        setOrderPlaced(true);
        clearCart();
      }, 1500);
      console.log("wordkedddddddfddd")
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again later.');
    }
  };

  return (
    <>
      {/* Image at the top */}
      <div className="w-100">
        <img 
          src={cartBanner} 
          alt="Shopping Cart Banner" 
          style={{ width: '100vw', height: '480px', objectFit: 'cover' }} 
          className="mb-4" 
        />
      </div>

      <div className="container-md">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - {cartItems.length} items</h5>
              </div>
              <div className="card-body">
                {cartItems.length === 0 ? (
                  <p className="text-center">Your cart is empty.</p>
                ) : (
                  cartItems.map((cartItem) => (
                    <div key={cartItem._id} className="row mb-3 border-bottom pb-3">
                      <div className="col-lg-3 col-md-12 mb-2">
                        <div className="bg-image hover-overlay hover-zoom ripple rounded">
                          <img src={cartItem.item_src} className="w-100" alt={cartItem.item_title} />
                          <a href="#!">
                            <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6 d-flex flex-column justify-content-between mb-2">
                        <div>
                          <p><strong>{cartItem.item_title}</strong></p>
                          <p className="text-muted">Price: ₹{cartItem.item_price}</p>
                        </div>
                        <div className="quantity-control">
                          <button className="quantity-btn" onClick={() => decreaseItemQuantity(cartItem._id)}> - </button>
                          <span className="quantity">{cartItem.quantity}</span>
                          <button className="quantity-btn" onClick={() => increaseItemQuantity(cartItem._id)}> + </button>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 d-flex flex-column justify-content-between mb-2">
                        <p className="text-muted text-end">Total: ₹{(cartItem.item_price * cartItem.quantity).toFixed(2)}</p>
                        <button className="btn btn-danger btn-sm align-self-end" onClick={() => removeItemFromCart(cartItem._id)}>Remove</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {cartItems.length > 0 && (
              <div className="card mb-4">
                <div className="card-body">
                  <p><strong>Expected shipping delivery</strong></p>
                  <p className="mb-0">Within 30 Minutes </p>
                </div>
              </div>
            )}
          </div>
          {!showCheckout && cartItems.length > 0 && (
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span>₹{cartItems.reduce((acc, cartItem) => acc + (cartItem.item_price * cartItem.quantity), 0).toFixed(2)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>Gratis</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span><strong>₹{cartItems.reduce((acc, cartItem) => acc + (cartItem.item_price * cartItem.quantity), 0).toFixed(2)}</strong></span>
                    </li>
                  </ul>
                  <button className="btn btn-primary btn-lg btn-block" onClick={handleGoToCheckout}>Go to Checkout</button>
                </div>
              </div>
            </div>
          )}
          {showCheckout && !orderPlaced && (
            <div className="col-md-4">
              <Checkout totalAmount={cartItems.reduce((acc, cartItem) => acc + (cartItem.item_price * cartItem.quantity), 0).toFixed(2)} handlePayment={handlePayment} />
            </div>
          )}
          {orderPlaced && (
            <div className="col-md-8">
              <OrderConfirmation orderDetails={orderedItems} orderId={orderId} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
