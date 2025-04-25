import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/components/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart">
      <h2>Your Order</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.title} x {item.quantity} — {item.price}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart} className="btn red-btn">Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
