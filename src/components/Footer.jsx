import React, { useState } from 'react';
import '../styles/components/Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email.');
      return;
    }

    const res = await fetch('http://localhost:5000/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    if (res.ok) {
      setMessage('Subscribed successfully!');
      setEmail('');
    } else {
      const data = await res.json();
      setMessage(data.error || 'Subscription failed.');
    }
  };

  return (
    <>
      <div className="general-info" id="subscribe">
        <div className="info-container container">
          <div className="info">
            <h3>Address</h3>
            <p>251 Bd Saint-Joseph A, Gatineau, QC J8Y 3X5</p>
          </div>
          <div className="info">
            <h3>Schedule</h3>
            <p>Tuesday-Friday 9am - 6pm</p>
            <p>Saturday and Monday 10am - 5pm</p>
            <div className="social-media social-foot">
              <i className="fab fa-facebook-square"></i>       
            </div>
          </div>
          <div className="info">
            <h3>News</h3>
            <p>Subscribe to receive latest News</p>       
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="submit"
              value="Subscribe"
              className="btn red-btn"
              onClick={handleSubscribe}
            />
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>Copyright &copy; 2024 Boulangerie Pan Caliente</p>
      </footer>
    </>
  );
};

export default Footer;
