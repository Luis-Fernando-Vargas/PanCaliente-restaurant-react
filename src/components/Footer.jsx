import React from 'react';
import '../styles/components/Footer.css';

const Footer = () => {
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
            <input type="email" placeholder="Your Email" />
            <input type="submit" value="Subscribe" className="btn red-btn" />
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