// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (dish) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === dish.id);
      let newCart;
      if (itemIndex !== -1) {
        newCart = prevItems.map((item, index) =>
          index === itemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevItems, { ...dish, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(newCart)); // ✅ actualizar localStorage
      return newCart;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (dishId) => {
    setCartItems(prevItems => {
      const updatedCart = prevItems
        .map(item =>
          item.id === dishId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // ✅ actualizar localStorage
      return updatedCart;
    });
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Escucha para abrir carrito desde otras partes
  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('open-cart', handleOpenCart);
    return () => window.removeEventListener('open-cart', handleOpenCart);
  }, []);

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      isCartOpen,
      openCart,
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
