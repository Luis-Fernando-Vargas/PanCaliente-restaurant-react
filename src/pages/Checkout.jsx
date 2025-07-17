import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/pages/Checkout.css';

const Checkout = () => {
  const { cartItems, setCartItems } = useCart();
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', '')) || 0;
    return sum + price * item.quantity;
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      customer: form,
      items: cartItems,
      total
    };

    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Order created:', data);
        setSubmitted(true);
        setCartItems([]);
        localStorage.removeItem('cart');
      })
      .catch(err => console.error('Error sending order:', err));
  };

  if (submitted) {
    return (
      <div className="checkout-success">
        <h2>Thank you for your order!</h2>
        <p>Your order has been placed successfully and is being processed.</p>
        <button className="btn-home" onClick={() => navigate('/')}>
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map(item => {
            const price = parseFloat(item.price.replace('$', '')) || 0;
            return (
              <li key={item.id}>
                {item.title} x {item.quantity} = ${(price * item.quantity).toFixed(2)}
              </li>
            );
          })}
        </ul>
        <p><strong>Total:</strong> ${total.toFixed(2)}</p>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h3>Customer Information</h3>

        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Full Name"
          required
          pattern="^[A-Za-z\s]{2,}$"
          title="Only letters and spaces are allowed"
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          placeholder="Address"
          required
          pattern="^[\w\s\.,#-]{5,}$"
          title="Please enter a valid address"
          value={form.address}
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          pattern="^\d{7,15}$"
          title="Only numbers allowed (7 to 15 digits)"
          value={form.phone}
          onChange={handleChange}
        />

        <button type="submit" className="btn-confirmar">Confirm Order</button>
      </form>
    </div>
  );
};

export default Checkout;
