// src/components/CartSidebar.jsx
import React from 'react';
import '../styles/components/CartSidebar.css';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';


const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart } = useCart();

  // Calcular el total
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', '')) || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Your Order</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      {cartItems.length === 0 ? (
        <p>No items in your order yet.</p>
      ) : (
        <>
          <div className="cart-items">
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <h4>{item.title}</h4>
                    <p>Price: {item.price}</p>
                    <p>Qty: {item.quantity}</p>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="cart-footer">
            <p className="cart-total">Total: ${total.toFixed(2)}</p>
            {cartItems.length > 0 && (
            <Link to="/checkout">
              <button className="checkout-btn" onClick={onClose}>Checkout</button>
            </Link>
            )}
          </div>
        </>
      )}
      

    </div>
  );
};

export default CartSidebar;
