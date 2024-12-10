import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['cart']);
  const [cartItems, setCartItems] = useState(cookies.cart || []);
  const [maxLimitNotified, setMaxLimitNotified] = useState({}); // Tracks notification flags for each item and total cart

  useEffect(() => {
    setCookie('cart', cartItems, { path: '/' });
  }, [cartItems, setCookie]);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const addItemToCart = (item) => {
    const totalItems = getTotalItems();

    if (totalItems >= 60) {
      if (!maxLimitNotified['total']) {
        toast.warning('Cart limit reached! A maximum of 60 items can be added.');
        setMaxLimitNotified((prev) => ({ ...prev, total: true })); // Notify the user only once
      }
      return;
    }

    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      const updatedQuantity = updatedCart[existingItemIndex].quantity + 1;

      if (updatedQuantity > 30) {
        if (!maxLimitNotified[item._id]) {
          toast.warning('No more than 30 of the same item can be added.');
          setMaxLimitNotified((prev) => ({ ...prev, [item._id]: true }));
        }
      } else {
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedQuantity,
        };
        setCartItems(updatedCart);
        toast.info(`${item.item_title} quantity increased.`);
        setMaxLimitNotified((prev) => ({ ...prev, [item._id]: false }));
      }
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      toast.success(`${item.item_title} added to cart.`);
    }
  };

  const removeItemFromCart = (itemId) => {
    const itemToRemove = cartItems.find((item) => item._id === itemId);
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
    if (itemToRemove) {
      toast.error(`${itemToRemove.item_title} removed from cart.`);
    }
    setMaxLimitNotified((prev) => {
      const { [itemId]: _, ...rest } = prev; // Remove notification flag for the item
      return rest;
    });
  };

  const increaseItemQuantity = (itemId) => {
    const totalItems = getTotalItems();

    if (totalItems >= 60) {
      if (!maxLimitNotified['total']) {
        toast.warning('Cart limit reached! A maximum of 60 items can be added.');
        setMaxLimitNotified((prev) => ({ ...prev, total: true }));
      }
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: Math.min(item.quantity + 1, 30) } : item
    );

    const item = updatedCart.find((item) => item._id === itemId);
    setCartItems(updatedCart);

    if (item.quantity === 30) {
      if (!maxLimitNotified[itemId]) {
        toast.warning('No more than 30 of the same item can be added.');
        setMaxLimitNotified((prev) => ({ ...prev, [itemId]: true }));
      }
    } else {
      toast.info('Item quantity increased.');
      setMaxLimitNotified((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const decreaseItemQuantity = (itemId) => {
    const itemToDecrease = cartItems.find((item) => item._id === itemId);

    if (itemToDecrease) {
      if (itemToDecrease.quantity > 1) {
        const updatedCart = cartItems.map((item) =>
          item._id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCart);
        toast.info('Item quantity decreased.');
        setMaxLimitNotified((prev) => ({ ...prev, [itemId]: false }));
      } else {
        removeItemFromCart(itemId);
      }
    }
  };

  const clearCart = () => {
    setCartItems([]);
   // toast.success('Cart cleared.');
    setMaxLimitNotified({}); // Reset all notification flags
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        increaseItemQuantity,
        decreaseItemQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
